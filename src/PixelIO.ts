import { isEmpty, isNil, isNotNil } from 'ramda'

import { EventEmitter } from './EventDispatcher'
import {
  ContainerConfig,
  Events,
  MenuItem,
  OpenOptions,
  PixelIOConfig,
  SizeObject,
} from './types/definitions'

enum EventPostMessage {
  STATE = 'state',
  IMAGE = 'image',
  UPGRADE = 'upgrade',
  CLOSE_PIXEL = 'closePixel',
  ClICK_LOGO = 'clickLogo',
  ON_SAVE = 'onSave',
}

/**
 * Classe représentant le module PixelIO, étendant la classe EventEmitter.
 * @extends EventEmitter
 */
export class PixelIO extends EventEmitter {
  /**
   * Constante représentant le domaine URI.
   * @readonly
   */
  static readonly DOMAIN = 'URI'

  /**
   * Constante représentant l'URI du pixel.
   * @readonly
   */
  static readonly PIXEL_URI = 'URI'

  /**
   * Constante représentant l'identifiant de l'émetteur.
   * @readonly
   */
  static readonly EMITTER_ID = 'pixelio'

  /**
   * Constante représentant la version de PixelIO.
   * @readonly
   */
  static readonly PIO_VERSION = 'pio_version'

  /**
   * Élément du DOM représentant le conteneur du pixel.
   * @private
   * @type {HTMLIFrameElement | Window | null}
   */
  private __pixelContainer: HTMLIFrameElement | Window | null = null

  /**
   * Image temporaire utilisée par le pixel.
   * @private
   * @type {string | File}
   */
  private __temporaryImage: string | File = ''

  /**
   * Liste de classes CSS appliquées au pixel.
   * @private
   * @type {string[]}
   */
  private __pixelClass: string[] = []

  /**
   * Configuration principale de PixelIO.
   * @private
   * @type {PixelIOConfig}
   */
  private __config: PixelIOConfig

  /**
   * Fonction d'écoute du
   */
  private __listenner: (evt: MessageEvent) => void

  /**
   * Constructeur de la classe PixelIO.
   * @param {string | Partial<PixelIOConfig>} tokenOrConfig - Token ou configuration partielle.
   * @param {Partial<PixelIOConfig>} config - Configuration partielle.
   */
  constructor(
    tokenOrConfig?: string | Partial<PixelIOConfig>,
    config?: Partial<PixelIOConfig>
  ) {
    super()

    /**
     * Configuration par défaut de PixelIO.
     * @type {PixelIOConfig}
     */
    const defaultConfig: PixelIOConfig = {
      token: '',
      size: { width: 800, height: 600, restrict: false },
      css: '',
      upgradeEvent: false,
      canSaveLocal: false,
      domain: '',
      closeButton: false,
      saveMenuList: [],
      container: {
        type: 'iframe',
        parameters: [],
      },
      debug: false,
    }

    /**
     * Configuration de PixelIO, résultant de la fusion des valeurs par défaut et fournies.
     * @type {PixelIOConfig}
     */
    this.__config = {
      ...defaultConfig,
      ...(typeof tokenOrConfig === 'string'
        ? { token: tokenOrConfig }
        : tokenOrConfig),
      ...(config || {}),
    }

    // Application de la feuille de style CSS
    this.css = this.__config.css

    //
    this.__listenner = this.__onReceivedMessage.bind(this)
  }

  /**
   * Méthode pour ouvrir le pixel avec une image et une configuration de conteneur facultatives.
   * @param {string | File} [image] - Image à afficher dans le pixel.
   * @param {ContainerConfig} [config={ type: 'iframe', parameters: [''] }] - Configuration du conteneur.
   * @returns {void}
   */
  open(options?: OpenOptions): void {
    // Stockage de l'image temporaire si fournie
    if (options?.image) {
      this.__temporaryImage = options.image
    }
    if (options?.size) {
      this.__config.size = options.size
    }

    // Vérification si le conteneur existe
    if (this.__pixelContainer === null) {
      // Attribution de la configuration du conteneur cible
      if (options?.container) this.__config.container = options.container

      // Création du conteneur et des écouteurs
      this.__createContainer(this.__config.container)
      this.__createListeners()
    } else {
      // Si le conteneur est une fenêtre et qu'elle est fermée, réinitialisation
      if (
        this.__config.container?.type === 'window' &&
        (this.__pixelContainer as Window).closed
      ) {
        this.__pixelContainer = null
        this.open(options)
      }
    }
  }

  /**
   * Méthode pour fermer le pixel.
   * @returns {void}
   */
  close(): void {
    if (this.__pixelContainer) {
      // Fermeture du conteneur en fonction de son type
      if (this.__config.container.type === 'iframe') {
        ;(this.__pixelContainer as HTMLIFrameElement).parentNode?.removeChild(
          this.__pixelContainer as HTMLIFrameElement
        )
      } else {
        ;(this.__pixelContainer as Window).close()
      }

      // Réinitialisation du conteneur
      this.__pixelContainer = null
    }
  }

  /**
   * Accesseur pour définir la configuration de PixelIO.
   * @param {Partial<PixelIOConfig>} conf - Configuration partielle à appliquer.
   * @returns {void}
   */
  set config(conf: Partial<PixelIOConfig>) {
    this.__config = { ...this.__config, ...conf }
  }

  /**
   * Accesseur pour définir le token.
   * @param {string} token - Token à définir.
   * @returns {void}
   */
  set token(token: string) {
    this.__config.token = token
  }

  /**
   * Accesseur pour définir la taille.
   * @param {SizeObject} size - Taille à définir.
   * @returns {void}
   */
  set size(size: SizeObject) {
    this.__config.size = size
  }

  /**
   * Accesseur pour obtenir la taille.
   * @returns {SizeObject}
   */
  get size(): SizeObject {
    return this.__config.size
  }

  /**
   * Accesseur pour définir le domaine.
   * @param {string} value - Domaine à définir.
   * @returns {void}
   */
  set domain(value: string) {
    if (this.__config) {
      this.__config.domain = value
    }
  }

  /**
   * Accesseur pour définir les classes CSS.
   * @param {string} pc - Classes CSS à définir.
   * @returns {void}
   */
  set css(pc: string) {
    this.__pixelClass = pc ? pc.replace(/\s+/gm, ',').split(',') : []
  }

  get css(): string[] {
    return this.__pixelClass || []
  }

  /**
   * Accesseur pour obtenir le token.
   * @returns {string}
   */
  get token(): string {
    return this.__config.token
  }

  /**
   * Accesseur pour définir la possibilité de sauvegarder localement.
   * @param {boolean} value - Valeur à définir.
   * @returns {void}
   */
  set canSaveLocal(value: boolean) {
    this.__config.canSaveLocal = value
  }

  /**
   * Accesseur pour obtenir la possibilité de sauvegarder localement.
   * @returns {boolean}
   */
  get canSaveLocal(): boolean {
    return this.__config.canSaveLocal
  }

  /**
   * Accesseur pour obtenir la configuration de PixelIO.
   * @returns {PixelIOConfig}
   */
  get config(): PixelIOConfig {
    return this.__config
  }

  /**
   * Méthode pour ajouter des éléments au menu de sauvegarde.
   * @param {MenuItem | MenuItem[]} menuItem - Élément ou liste d'éléments à ajouter.
   * @returns {void}
   */
  addMenuItems(menuItem: MenuItem | MenuItem[]) {
    if (isNil(this.__config?.saveMenuList)) {
      this.__config.saveMenuList = []
    }
    if (Array.isArray(menuItem)) {
      this.__config.saveMenuList = [...this.__config.saveMenuList, ...menuItem]
    } else {
      this.__config.saveMenuList = [...this.__config.saveMenuList, menuItem]
    }
  }

  /**
   * Méthode pour supprimer des éléments du menu de sauvegarde.
   * @param {MenuItem | MenuItem[]} menuItem - Élément ou liste d'éléments à supprimer, les clés de suppression sont les labels.
   * @returns {void}
   */
  removeMenuItems(menuItem: MenuItem | MenuItem[] | string | string[]): void {
    if (isEmpty(this.__config.saveMenuList)) {
      throw new Error('La liste des menu est vide')
    }

    const labelList: string[] = Array.isArray(menuItem)
      ? menuItem.map((menu) => (typeof menu === 'string' ? menu : menu.label))
      : [typeof menuItem === 'string' ? menuItem : menuItem.label]

    const filteredArray = this.__config.saveMenuList.filter(
      (menu) => !labelList.includes(menu.label)
    )

    if (filteredArray.length === this.__config.saveMenuList.length) {
      throw new Error('Menu non trouvé, vérifier le label du menu')
    }

    this.__config.saveMenuList = filteredArray
  }

  /**
   * Accesseur pour obtenir les éléments du menu de sauvegarde.
   * @returns {MenuItem[] | undefined}
   */
  get menuItems(): MenuItem[] | undefined {
    return this.__config.saveMenuList
  }

  /**
   * Méthode privée pour créer le conteneur en fonction de la configuration fournie.
   * @private
   * @param {ContainerConfig} target - Configuration du conteneur.
   * @returns {void}
   */
  private __createContainer(target: ContainerConfig): void {
    // URL du pixel
    let url = PixelIO.PIXEL_URI

    // Construction de l'URL en fonction de la configuration
    if (isNil(this.__config.domain)) {
      url = `${url}?t=${this.__config.token}`
    } else if (this.__config.domain.trim() === '*') {
      throw new Error('domaine * non autorisé')
    } else {
      url = `${url}?d=${this.__config.domain}&v=${PixelIO.PIO_VERSION}`
    }

    // Création du conteneur en fonction du type spécifié
    if (target.type === 'iframe') {
      const domElement =
        target.parameters && target.parameters.length > 0
          ? document.querySelector(target.parameters[0])
          : document.body

      this.__pixelContainer = document.createElement('iframe')
      this.__pixelContainer.src = url

      // Ajout des classes CSS au conteneur
      this.__pixelClass.forEach((cls) =>
        (this.__pixelContainer as HTMLIFrameElement).classList.add(cls)
      )

      domElement?.appendChild(this.__pixelContainer)
      return
    }

    if (target.type === 'window') {
      // Ouverture d'une fenêtre avec les paramètres spécifiés
      this.__pixelContainer = window.open.apply(
        null,
        target.parameters.length ? [url, ...target.parameters] : [url]
      )
    }
  }

  /**
   * Méthode privée pour créer les écouteurs d'événements.
   * @private
   * @returns {void}
   */
  private __createListeners(): void {
    // Suppression des écouteurs existants et ajout du nouvel écouteur pour les messages
    window.removeEventListener('message', this.__listenner)
    window.addEventListener('message', this.__listenner)
  }

  /**
   * Méthode privée pour gérer les messages reçus.
   * @private
   * @param {MessageEvent} msg - Événement de message reçu.
   * @returns {void}
   */
  private __onReceivedMessage(msg: MessageEvent): void {
    if (this.__config.debug) {
      console.log('[PIO DEBUG]-[MESSAGE EVENT]', msg)
    }
    // Vérification de la validité du message
    if (!this.__validMessage(msg)) {
      return
    }

    // Extraction des données et de l'événement du message
    const { data, event } = msg.data
    // Traitement en fonction de l'événement
    switch (event) {
      case EventPostMessage.STATE:
        console.log(this.__temporaryImage)
        if (data === 'ready') {
          // Envoi des informations d'initialisation au pixel
          const data = {
            event: 'init',
            openedMode: this.__config.container?.type,
            canSaveLocal: this.__config.canSaveLocal,
            token: this.__config.token,
            emitter: PixelIO.EMITTER_ID,
            image: this.__temporaryImage,
            size: this.__config.size,
            upgradeEvent: this.__config.upgradeEvent,
            closeButton: this.__config.closeButton,
            saveMenuList: this.__config.saveMenuList,
          }

          // Envoi du message au pixel en fonction du type de conteneur
          if (this.__config.container.type === 'iframe') {
            ;(
              this.__pixelContainer as HTMLIFrameElement
            ).contentWindow?.postMessage(data, PixelIO.DOMAIN)
          } else {
            ;(this.__pixelContainer as Window).postMessage(data, PixelIO.DOMAIN)
          }
        }
        break
      case EventPostMessage.IMAGE:
        // Émission d'un événement 'export' avec les données de l'image
        ;(this as EventEmitter).emit(Events.EXPORT, data)
        break
      case EventPostMessage.UPGRADE:
        // Émission d'un événement 'upgrade' avec les données de la mise à niveau
        ;(this as EventEmitter).emit(Events.UPGRADE, data)
        break
      case EventPostMessage.CLOSE_PIXEL:
        // Émission d'un événement 'close' avec les données de la fermeture
        ;(this as EventEmitter).emit(Events.CLOSE_PIXEL, data)
        break
      case EventPostMessage.ClICK_LOGO:
        // Émission d'un événement 'clickLogo' avec les données du clic sur le
        ;(this as EventEmitter).emit(Events.CLICK_LOGO, data)
        break
      case EventPostMessage.ON_SAVE:
        // Émission d'un événement spécifique du menu de sauvegarde
        ;(this as EventEmitter).emit(data.eventName, data)
        break
    }
  }

  /**
   * Méthode privée pour vérifier la validité d'un message reçu.
   *
   * @param msg - L'objet MessageEvent représentant le message reçu.
   * @returns Boolean indiquant si le message est valide.
   */
  private __validMessage(msg: MessageEvent): boolean {
    const authorizedEvent: string[] = [
      EventPostMessage.STATE,
      EventPostMessage.IMAGE,
      EventPostMessage.UPGRADE,
      EventPostMessage.CLOSE_PIXEL,
      EventPostMessage.ClICK_LOGO,
      EventPostMessage.ON_SAVE,
    ]

    return (
      authorizedEvent.includes(msg.data.event) &&
      isNotNil(msg.data.event) &&
      isNotNil(msg.data.data) &&
      msg.origin === PixelIO.DOMAIN
    )
  }
}

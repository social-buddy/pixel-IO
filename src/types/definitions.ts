// Type de configuration pour un conteneur iframe.
export type IframeContainerConfig = {
  /**
   * Type du conteneur, toujours 'iframe'.
   */
  type: 'iframe'
  /**
   * Un tableau de paramètres pour l'iframe.
   */
  parameters: string[]
}

export type OpenOptions = {
  image?: string | File
  size?: SizeObject
  container?: ContainerConfig
}

// Type de configuration pour un conteneur de fenêtre.
export type WindowContainerConfig = {
  /**
   * Type du conteneur, toujours 'window'.
   */
  type: 'window'
  /**
   * Un tableau de paramètres pour la fenêtre.
   */
  parameters: [target?: string | undefined, features?: string | undefined]
}

// Type d'union représentant soit IframeContainerConfig soit WindowContainerConfig.
export type ContainerConfig = IframeContainerConfig | WindowContainerConfig

// Type représentant les dimensions d'un objet.
export type SizeObject = {
  /**
   * Largeur de l'objet.
   */
  width: number
  /**
   * Hauteur de l'objet.
   */
  height: number
  /**
   * Drapeau facultatif pour restreindre les dimensions.
   */
  restrict?: boolean
}

// Type représentant un élément de menu pour la sauvegarde.
export type MenuItem = {
  /**
   * Le libellé de l'élément de menu.
   */
  label: string
  /**
   * Drapeau indiquant si le téléchargement doit être direct. Si oui lors du clique l'image dans pixel sera automatiquement télécharger sur le client
   */
  directDownload: boolean
  /**
   * Nom d'événement optionnel associé à l'élément de menu.
   */
  eventName?: string
  /**
   * Icône optionnelle pour l'élément de menu.
   */
  icon?: string
  /**
   * Données optionnelles associées à l'élément de menu.
   */
  data?: any
}

// Type représentant la configuration de PixelIO.
export type PixelIOConfig = {
  /**
   * Toekn utilisateur
   */
  token: string
  /**
   * Dimensions de PixelIO.
   */
  size: SizeObject
  /**
   * CSS pour le style de PixelIO.
   */
  css: string
  /**
   * Domaine d'information pour PixelIO.
   */
  domain: string
  /**
   * Drapeau indiquant si un événement de mise à niveau est activé.
   */
  upgradeEvent: boolean
  /**
   * Drapeau indiquant si un bouton de fermeture est activé.
   */
  closeButton: boolean
  /**
   * Drapeau indiquant si la sauvegarde locale est autorisée.
   */
  canSaveLocal: boolean
  /**
   * Liste optionnelle d'éléments de menu pour la sauvegarde.
   */
  saveMenuList: MenuItem[]

  /**
   * Option de configuration du container de pixel
   */
  container: ContainerConfig

  /**
   * Definit si mode debugage ou non, par defaut false
   */
  debug: boolean
}

// Énumération représentant divers événements pour PixelIO.
export enum Events {
  /**
   * Événement pour les actions liées à l'image.
   */
  EXPORT = 'export',
  /**
   * Événement pour les actions liées à la mise à niveau.
   */
  UPGRADE = 'upgrade',
  /**
   * Événement pour la fermeture de Pixel.
   */
  CLOSE_PIXEL = 'close',
  /**
   * Événement pour cliquer sur le logo de Pixel.
   */
  CLICK_LOGO = 'clickLogo',
}

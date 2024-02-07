type EventCallback = (...args: any[]) => void;
/**
 * Classe représentant un émetteur d'événements.
 */
declare class EventEmitter {
    /**
     * Propriété privée pour stocker les écouteurs d'événements.
     * @private
     * @type {EventListeners}
     */
    private __listeners;
    /**
     * S'abonner à un événement et fournir une fonction de rappel.
     * @param {string} eventName - Le nom de l'événement auquel s'abonner.
     * @param {EventCallback} callback - La fonction de rappel à exécuter lorsque l'événement est émis.
     * @returns {void}
     */
    on(eventName: string, callback: EventCallback): void;
    /**
     * S'abonner à un événement uniquement s'il n'a pas déjà d'écouteurs.
     * @param {string} eventName - Le nom de l'événement auquel s'abonner.
     * @param {EventCallback} callback - La fonction de rappel à exécuter lorsque l'événement est émis.
     * @returns {void}
     */
    only(eventName: string, callback: EventCallback): void;
    /**
     * Déclencher tous les écouteurs pour un événement spécifique.
     * @param {string} eventName - Le nom de l'événement à émettre.
     * @param {...any} args - Arguments à transmettre aux écouteurs d'événements.
     * @returns {void}
     */
    emit(eventName: string, ...args: any[]): void;
    /**
     * Désabonner une fonction de rappel spécifique des écouteurs d'un événement.
     * @param {string} eventName - Le nom de l'événement auquel se désabonner.
     * @param {EventCallback} callback - La fonction de rappel à désabonner.
     * @returns {void}
     */
    off(eventName: string, callback: EventCallback): void;
    /**
     * S'abonner à un événement et se désabonner automatiquement après la première invocation.
     * @param {string} eventName - Le nom de l'événement auquel s'abonner.
     * @param {EventCallback} callback - La fonction de rappel à exécuter une fois.
     * @returns {void}
     */
    once(eventName: string, callback: EventCallback): void;
    /**
     * Supprimer tous les écouteurs pour tous les événements.
     * @returns {void}
     */
    removeAllListeners(): void;
}

type IframeContainerConfig = {
    /**
     * Type du conteneur, toujours 'iframe'.
     */
    type: 'iframe';
    /**
     * Un tableau de paramètres pour l'iframe.
     */
    parameters: string[];
};
type OpenOptions = {
    image?: string | File;
    size?: SizeObject;
    container?: ContainerConfig;
};
type WindowContainerConfig = {
    /**
     * Type du conteneur, toujours 'window'.
     */
    type: 'window';
    /**
     * Un tableau de paramètres pour la fenêtre.
     */
    parameters: [target?: string | undefined, features?: string | undefined];
};
type ContainerConfig = IframeContainerConfig | WindowContainerConfig;
type SizeObject = {
    /**
     * Largeur de l'objet.
     */
    width: number;
    /**
     * Hauteur de l'objet.
     */
    height: number;
    /**
     * Drapeau facultatif pour restreindre les dimensions.
     */
    restrict?: boolean;
};
type MenuItem = {
    /**
     * Le libellé de l'élément de menu.
     */
    label: string;
    /**
     * Drapeau indiquant si le téléchargement doit être direct. Si oui lors du clique l'image dans pixel sera automatiquement télécharger sur le client
     */
    directDownload: boolean;
    /**
     * Nom d'événement optionnel associé à l'élément de menu.
     */
    eventName?: string;
    /**
     * Icône optionnelle pour l'élément de menu.
     */
    icon?: string;
    /**
     * Données optionnelles associées à l'élément de menu.
     */
    data?: any;
};
type PixelIOConfig = {
    /**
     * Toekn utilisateur
     */
    token: string;
    /**
     * Dimensions de PixelIO.
     */
    size: SizeObject;
    /**
     * CSS pour le style de PixelIO.
     */
    css: string;
    /**
     * Domaine d'information pour PixelIO.
     */
    domain: string;
    /**
     * Drapeau indiquant si un événement de mise à niveau est activé.
     */
    upgradeEvent: boolean;
    /**
     * Drapeau indiquant si un bouton de fermeture est activé.
     */
    closeButton: boolean;
    /**
     * Drapeau indiquant si la sauvegarde locale est autorisée.
     */
    canSaveLocal: boolean;
    /**
     * Liste optionnelle d'éléments de menu pour la sauvegarde.
     */
    saveMenuList: MenuItem[];
    /**
     * Option de configuration du container de pixel
     */
    container: ContainerConfig;
    /**
     * Definit si mode debugage ou non, par defaut false
     */
    debug: boolean;
};
declare enum Events {
    /**
     * Événement pour les actions liées à l'image.
     */
    EXPORT = "export",
    /**
     * Événement pour les actions liées à la mise à niveau.
     */
    UPGRADE = "upgrade",
    /**
     * Événement pour la fermeture de Pixel.
     */
    CLOSE_PIXEL = "close",
    /**
     * Événement pour cliquer sur le logo de Pixel.
     */
    CLICK_LOGO = "clickLogo"
}

/**
 * Classe représentant le module PixelIO, étendant la classe EventEmitter.
 * @extends EventEmitter
 */
declare class PixelIO extends EventEmitter {
    /**
     * Constante représentant le domaine URI.
     * @readonly
     */
    static readonly DOMAIN = "URI";
    /**
     * Constante représentant l'URI du pixel.
     * @readonly
     */
    static readonly PIXEL_URI = "URI";
    /**
     * Constante représentant l'identifiant de l'émetteur.
     * @readonly
     */
    static readonly EMITTER_ID = "pixelio";
    /**
     * Constante représentant la version de PixelIO.
     * @readonly
     */
    static readonly PIO_VERSION = "pio_version";
    /**
     * Élément du DOM représentant le conteneur du pixel.
     * @private
     * @type {HTMLIFrameElement | Window | null}
     */
    private __pixelContainer;
    /**
     * Image temporaire utilisée par le pixel.
     * @private
     * @type {string | File}
     */
    private __temporaryImage;
    /**
     * Liste de classes CSS appliquées au pixel.
     * @private
     * @type {string[]}
     */
    private __pixelClass;
    /**
     * Configuration principale de PixelIO.
     * @private
     * @type {PixelIOConfig}
     */
    private __config;
    /**
     * Fonction d'écoute du
     */
    private __listenner;
    /**
     * Constructeur de la classe PixelIO.
     * @param {string | Partial<PixelIOConfig>} tokenOrConfig - Token ou configuration partielle.
     * @param {Partial<PixelIOConfig>} config - Configuration partielle.
     */
    constructor(tokenOrConfig?: string | Partial<PixelIOConfig>, config?: Partial<PixelIOConfig>);
    /**
     * Méthode pour ouvrir le pixel avec une image et une configuration de conteneur facultatives.
     * @param {string | File} [image] - Image à afficher dans le pixel.
     * @param {ContainerConfig} [config={ type: 'iframe', parameters: [''] }] - Configuration du conteneur.
     * @returns {void}
     */
    open(options?: OpenOptions): void;
    /**
     * Méthode pour fermer le pixel.
     * @returns {void}
     */
    close(): void;
    /**
     * Accesseur pour définir la configuration de PixelIO.
     * @param {Partial<PixelIOConfig>} conf - Configuration partielle à appliquer.
     * @returns {void}
     */
    set config(conf: Partial<PixelIOConfig>);
    /**
     * Accesseur pour définir le token.
     * @param {string} token - Token à définir.
     * @returns {void}
     */
    set token(token: string);
    /**
     * Accesseur pour définir la taille.
     * @param {SizeObject} size - Taille à définir.
     * @returns {void}
     */
    set size(size: SizeObject);
    /**
     * Accesseur pour obtenir la taille.
     * @returns {SizeObject}
     */
    get size(): SizeObject;
    /**
     * Accesseur pour définir le domaine.
     * @param {string} value - Domaine à définir.
     * @returns {void}
     */
    set domain(value: string);
    /**
     * Accesseur pour définir les classes CSS.
     * @param {string} pc - Classes CSS à définir.
     * @returns {void}
     */
    set css(pc: string);
    get css(): string[];
    /**
     * Accesseur pour obtenir le token.
     * @returns {string}
     */
    get token(): string;
    /**
     * Accesseur pour définir la possibilité de sauvegarder localement.
     * @param {boolean} value - Valeur à définir.
     * @returns {void}
     */
    set canSaveLocal(value: boolean);
    /**
     * Accesseur pour obtenir la possibilité de sauvegarder localement.
     * @returns {boolean}
     */
    get canSaveLocal(): boolean;
    /**
     * Accesseur pour obtenir la configuration de PixelIO.
     * @returns {PixelIOConfig}
     */
    get config(): PixelIOConfig;
    /**
     * Méthode pour ajouter des éléments au menu de sauvegarde.
     * @param {MenuItem | MenuItem[]} menuItem - Élément ou liste d'éléments à ajouter.
     * @returns {void}
     */
    addMenuItems(menuItem: MenuItem | MenuItem[]): void;
    /**
     * Méthode pour supprimer des éléments du menu de sauvegarde.
     * @param {MenuItem | MenuItem[]} menuItem - Élément ou liste d'éléments à supprimer, les clés de suppression sont les labels.
     * @returns {void}
     */
    removeMenuItems(menuItem: MenuItem | MenuItem[] | string | string[]): void;
    /**
     * Accesseur pour obtenir les éléments du menu de sauvegarde.
     * @returns {MenuItem[] | undefined}
     */
    get menuItems(): MenuItem[] | undefined;
    /**
     * Méthode privée pour créer le conteneur en fonction de la configuration fournie.
     * @private
     * @param {ContainerConfig} target - Configuration du conteneur.
     * @returns {void}
     */
    private __createContainer;
    /**
     * Méthode privée pour créer les écouteurs d'événements.
     * @private
     * @returns {void}
     */
    private __createListeners;
    /**
     * Méthode privée pour gérer les messages reçus.
     * @private
     * @param {MessageEvent} msg - Événement de message reçu.
     * @returns {void}
     */
    private __onReceivedMessage;
    /**
     * Méthode privée pour vérifier la validité d'un message reçu.
     *
     * @param msg - L'objet MessageEvent représentant le message reçu.
     * @returns Boolean indiquant si le message est valide.
     */
    private __validMessage;
}

export { type ContainerConfig, Events, type IframeContainerConfig, type MenuItem, PixelIO, type PixelIOConfig, type SizeObject, type WindowContainerConfig };

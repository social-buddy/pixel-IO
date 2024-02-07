// Définir un type pour une fonction de rappel qui peut prendre n'importe quel nombre d'arguments et renvoyer void
type EventCallback = (...args: any[]) => void

/**
 * Interface pour les écouteurs d'événements, où les clés sont les noms des événements et les valeurs sont des tableaux de fonctions EventCallback.
 * @interface
 */
interface EventListeners {
  [eventName: string]: EventCallback[]
}

/**
 * Classe représentant un émetteur d'événements.
 */
export class EventEmitter {
  /**
   * Propriété privée pour stocker les écouteurs d'événements.
   * @private
   * @type {EventListeners}
   */
  private __listeners: EventListeners = {}

  /**
   * S'abonner à un événement et fournir une fonction de rappel.
   * @param {string} eventName - Le nom de l'événement auquel s'abonner.
   * @param {EventCallback} callback - La fonction de rappel à exécuter lorsque l'événement est émis.
   * @returns {void}
   */
  on(eventName: string, callback: EventCallback): void {
    // Si l'événement n'a pas encore d'écouteurs, créez un tableau vide
    if (!this.__listeners[eventName]) {
      this.__listeners[eventName] = []
    }

    // Ajoutez la fonction de rappel au tableau d'écouteurs pour l'événement spécifié
    this.__listeners[eventName].push(callback)
  }

  /**
   * S'abonner à un événement uniquement s'il n'a pas déjà d'écouteurs.
   * @param {string} eventName - Le nom de l'événement auquel s'abonner.
   * @param {EventCallback} callback - La fonction de rappel à exécuter lorsque l'événement est émis.
   * @returns {void}
   */
  only(eventName: string, callback: EventCallback): void {
    // Si l'événement a déjà des écouteurs n'attache pas le nouveau listener
    if (this.__listeners[eventName]) {
      return
    }

    // Attachez la fonction de rappel fournie en tant que seul écouteur pour l'événement spécifié
    this.__listeners[eventName] = [callback]
  }

  /**
   * Déclencher tous les écouteurs pour un événement spécifique.
   * @param {string} eventName - Le nom de l'événement à émettre.
   * @param {...any} args - Arguments à transmettre aux écouteurs d'événements.
   * @returns {void}
   */
  emit(eventName: string, ...args: any[]): void {
    // Obtenez le tableau d'écouteurs pour l'événement spécifié
    const eventListeners = this.__listeners[eventName]

    // S'il y a des écouteurs, appelez chacun avec les arguments fournis
    if (eventListeners) {
      for (const listener of eventListeners) {
        listener(...args)
      }
    }
  }

  /**
   * Désabonner une fonction de rappel spécifique des écouteurs d'un événement.
   * @param {string} eventName - Le nom de l'événement auquel se désabonner.
   * @param {EventCallback} callback - La fonction de rappel à désabonner.
   * @returns {void}
   */
  off(eventName: string, callback: EventCallback): void {
    // Obtenez le tableau d'écouteurs pour l'événement spécifié
    const eventListeners = this.__listeners[eventName]

    // S'il y a des écouteurs, filtrez la fonction de rappel spécifiée
    if (eventListeners) {
      this.__listeners[eventName] = eventListeners.filter(
        (listener) => listener !== callback
      )
    }
  }

  /**
   * S'abonner à un événement et se désabonner automatiquement après la première invocation.
   * @param {string} eventName - Le nom de l'événement auquel s'abonner.
   * @param {EventCallback} callback - La fonction de rappel à exécuter une fois.
   * @returns {void}
   */
  once(eventName: string, callback: EventCallback): void {
    // Créez une nouvelle fonction qui se désabonnera automatiquement après la première invocation
    const fn = (...args: any[]) => {
      this.off(eventName, fn) // Se désabonner de la fonction elle-même
      callback(...args) // Appeler la fonction de rappel d'origine
    }

    // Abonnez la nouvelle fonction à l'événement spécifié
    this.on(eventName, fn)
  }

  /**
   * Supprimer tous les écouteurs pour tous les événements.
   * @returns {void}
   */
  removeAllListeners(): void {
    this.__listeners = {}
  }
}

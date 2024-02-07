# PixelIO Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
   - [Class: PixelIO](#class-pixelio)
     - [Properties](#properties)
     - [Constructor](#constructor)
     - [Methods](#methods)
4. [Examples](#examples)
5. [Events](#events)
6. [License](#license)

---

## 1. Introduction <a name="introduction"></a>

PixelIO permet la communication avec Pixel depuis une plateforme tiers (navigateur web). Cela permet d'envoyer et de recevoir des images entre pixel et l'applicatif utilisant PixelIO. La communication entre les application se fait via [Window.postmessage](https://developer.mozilla.org/fr/docs/Web/API/Window/postMessage).

## 2. Installation <a name="installation"></a>

- Browser:

```html
<script src="https://mb.pixel.swello.com/lib/pixelio.min.js"></script>
```

- Node : Ajouter la ligne suivante dans le **package.json**

```json
"pixelio": "github:social-buddy/pixel-IO"

```

# 3. Usage <a name="usage"></a>

Instancier pixelIO:

- Browser

```js
const { PixelIO } = PixelIOLib
```

- Node

```js
import { PixelIO } from 'pixelio'
```

### Class: PixelIO <a name="class-pixelio"></a>

#### Properties <a name="properties"></a>

- **config**: la configuration de pixelIO.
- **size**: la taille de l'espace de travail dans pixel, voir le **sizeobject**, si restrict est definit dans le size objet on empeche pixel de pouvoir choisir d'autre taille pour l'espace de travail.
- **saveMenuItems**: list of size items (read only) .
- **css**: the css to add on iframe container.
- **size**: A constant size configuration.

#### Constructor <a name="constructor"></a>

- **PixelIO(tokenOrConfig?: string | Partial<PixelIOConfig>, config?: Partial<PixelIOConfig>)**: Constructeur, des configuration peuvent être passer dans le constructeur ou bien via la propriété config

#### Methods <a name="methods"></a>

- **open(options?:OptionsOpen): void**: Ouvre pixel, des options d'ouverture peuvent .
- **close(): void**: Closes the pixel.
- **addSaveMenuItems(saveMenuItem: SaveMenuItem | SaveMenuItem[]): void**: Adds items to the save menu.
- **removeSaveMenuItems(saveMenuItem: SaveMenuItem | SaveMenuItem[] | string | string[]): void**: Removes items from the save menu.

# 4. Examples <a name="examples"></a>

### Exemple 1: Simple

```javascript
import { PixelIO } from 'pixelio'

const pixel = new PixelIO('your_token')
// ouverture de pixel dans une iframe
pixel.open()
```

### Exemple 2: Avec configuration

```javascript
import { PixelIO } from 'pixelio'

const customConfig = {
  token: 'your_token',
  css: 'custom-css-class-for-iframe',
}

const pixel = new PixelIO(customConfig)
pixel.open()
```

# 5. Events <a name="events"></a>

PixelIO emits the following events:

- **'Events.EXPORT'**: Triggered when an image export event occurs.
- **'Events.UPGRADE'**: Triggered when an upgrade event occurs.
- **'Events.CLOSE_PIXEL'**: Triggered when the pixel is closed.
- **'CLICK_LOGO'**: Triggered when the pixel logo is clicked.
- **eventName**: Custom events triggered by save menu items.

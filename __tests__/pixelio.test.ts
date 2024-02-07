import { describe, expect, test } from 'vitest'
import { PixelIO, PixelIOConfig } from '../dist'

const DEFAULT_CONFIG: PixelIOConfig = {
  token: '',
  size: {
    width: 800,
    height: 600,
    restrict: false,
  },
  container: {
    type: 'iframe',
    parameters: [],
  },
  canSaveLocal: false,
  closeButton: false,
  css: '',
  domain: '',
  upgradeEvent: false,
  saveMenuList: [],
}

describe(`Creation d'instance`, () => {
  test(`Creation simple sans paramètres avec config par default`, () => {
    const pio = new PixelIO()
    expect(pio.config).toStrictEqual(DEFAULT_CONFIG)
  })

  test(`Creation simple avec un token et configuration par défault`, () => {
    const mytoken = 'my-token'
    const pio = new PixelIO(mytoken)
    expect(pio.token).toBe(mytoken)
  })

  test(`Creation simple avec un token et un fichier de configuration`, () => {
    const mytoken = 'my-token'
    const myConf: Partial<PixelIOConfig> = {
      closeButton: true,
      canSaveLocal: true,
      size: {
        height: 789,
        width: 456,
        restrict: true,
      },
    }
    const pio = new PixelIO(mytoken, myConf)
    expect(pio.token).toBe(mytoken)
    expect(pio.config.closeButton).toBe(true)
    expect(pio.config.canSaveLocal).toBe(true)
    expect(pio.config.size).toStrictEqual({
      width: 456,
      height: 789,
      restrict: true,
    })
  })

  test(`Creation simple un fichier de configuration qui contient le token`, () => {
    const mytoken = 'my-token'
    const myConf: Partial<PixelIOConfig> = {
      token: 'token-du-mordor',
      closeButton: true,
      canSaveLocal: true,
      size: {
        height: 789,
        width: 456,
        restrict: true,
      },
    }
    const pio = new PixelIO(mytoken, myConf)
    expect(pio.token).toBe('token-du-mordor')
    expect(pio.config.closeButton).toBe(true)
    expect(pio.config.canSaveLocal).toBe(true)
    expect(pio.config.size).toStrictEqual({
      width: 456,
      height: 789,
      restrict: true,
    })
  })
})

describe(`Modification configuration`, () => {
  const pio = new PixelIO()
  test(`Modification de la configuration via un objet de config`, () => {
    const config = {
      token: 'token-de-gandalf',
      size: {
        width: 123,
        height: 456,
        restrict: true,
      },
      css: 'style1, style2',
      closeButton: true,
      canSaveLocal: true,
      saveMenuList: [
        {
          directDownload: true,
          label: 'Télécharger en jpg',
        },
      ],
    }
    pio.config = config
    expect(pio.config).toStrictEqual({ ...DEFAULT_CONFIG, ...config })
  })

  test(`Modification de la taille`, () => {
    pio.size = { height: 1024, width: 900 }
    expect(pio.size).toStrictEqual({ width: 900, height: 1024 })
  })

  test(`Modification du css `, () => {
    pio.css = 'flex rounded'
    expect(pio.css).toStrictEqual(['flex', 'rounded'])
  })
})
describe(`Gestion de menu`, () => {
  test(`Ajout d'un menu simple de téléchargement`, () => {
    const pio = new PixelIO()
    pio.addMenuItems({
      directDownload: true,
      label: 'alpha',
      eventName: 'onImageClicked',
    })
    expect(pio.menuItems?.length).toEqual(1)
    expect(pio.menuItems?.at(0)).toStrictEqual({
      directDownload: true,
      label: 'alpha',
      eventName: 'onImageClicked',
    })
  })
  test(`Ajout d'une liste de menu`, () => {
    const pio = new PixelIO()
    pio.addMenuItems({ directDownload: true, label: 'alpha' })
    expect(pio.menuItems?.length).toEqual(1)
    expect(pio.menuItems?.at(0)).toStrictEqual({
      directDownload: true,
      label: 'alpha',
    })
  })
  test(`Suppression d'un menu`, () => {
    const pio = new PixelIO()
    pio.addMenuItems({ directDownload: true, label: 'alpha' })
    pio.removeMenuItems({ directDownload: true, label: 'alpha' })
    expect(pio.menuItems?.length).toEqual(0)
  })

  test(`Suppression de plusieurs menus`, () => {
    const pio = new PixelIO()
    pio.addMenuItems({ directDownload: true, label: 'alpha' })
    pio.addMenuItems({ directDownload: true, label: 'beta' })
    pio.removeMenuItems([
      { directDownload: true, label: 'beta' },
      { directDownload: true, label: 'alpha' },
    ])
    expect(pio.menuItems?.length).toEqual(0)
  })
  test(`Suppression d'un menu de via le label`, () => {
    const pio = new PixelIO()
    pio.addMenuItems({ directDownload: true, label: 'alpha' })
    pio.removeMenuItems('alpha')
    expect(pio.menuItems?.length).toEqual(0)
  })
  test(`Suppression de plusieurs menus via une liste de label`, () => {
    const pio = new PixelIO()
    pio.addMenuItems({ directDownload: true, label: 'alpha' })
    pio.addMenuItems({ directDownload: true, label: 'beta' })
    pio.removeMenuItems(['alpha', 'beta'])
    expect(pio.menuItems?.length).toEqual(0)
  })
  test(`Soulève une erreur si suppression d'un menu et que la liste est vide`, () => {
    const pio = new PixelIO()
    expect(() =>
      pio.removeMenuItems({ directDownload: true, label: 'beta' })
    ).toThrowError('La liste des menu est vide')
  })

  test(`Soulève une erreur si suppression d'un menu qui n'existe pas dans la liste`, () => {
    const pio = new PixelIO()
    pio.addMenuItems({ directDownload: true, label: 'alpha' })
    expect(() =>
      pio.removeMenuItems({ directDownload: true, label: 'beta' })
    ).toThrowError('Menu non trouvé, vérifier le label du menu')
  })
})

export interface SpritesMap {
  sprite: 'arrow-back' | 'arrow-forward' | 'close-eye' | 'eye'
}
export const SPRITES_META: {
  [Key in keyof SpritesMap]: {
    filePath: string
    items: Record<
      SpritesMap[Key],
      {
        viewBox: string
        width: number
        height: number
      }
    >
  }
} = {
  sprite: {
    filePath: 'sprite.0a4e811c.svg',
    items: {
      'arrow-back': {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      'arrow-forward': {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      'close-eye': {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      eye: {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      }
    }
  }
}

export interface SpritesMap {
  sprite: 'arrow-back' | 'arrow-forward' | 'close-eye' | 'eye' | 'log-out' | 'profile'
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
    filePath: 'sprite.342222ed.svg',
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
      },
      'log-out': {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      profile: {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      }
    }
  }
}

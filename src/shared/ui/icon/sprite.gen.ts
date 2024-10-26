export interface SpritesMap {
  sprite:
    | 'arrow-back'
    | 'arrow-forward'
    | 'close-eye'
    | 'edit'
    | 'eye'
    | 'log-out'
    | 'loupe'
    | 'paginate-arrow-left'
    | 'paginate-arrow-right'
    | 'profile'
    | 'trash'
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
    filePath: 'sprite.7990aa44.svg',
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
      edit: {
        viewBox: '0 0 16 16',
        width: 16,
        height: 16
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
      loupe: {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      'paginate-arrow-left': {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      'paginate-arrow-right': {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      profile: {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      trash: {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      }
    }
  }
}

import { type SpritesMap, SPRITES_META } from './sprite.gen'

export type AnyIconName = { [Key in keyof SpritesMap]: IconNameType<Key> }[keyof SpritesMap]
export type IconNameType<Key extends keyof SpritesMap> = `${Key}/${SpritesMap[Key]}`
export const getIconMeta = <Key extends keyof SpritesMap>(name: IconNameType<Key>) => {
  const [spriteName, iconName] = name.split('/') as [Key, SpritesMap[Key]]
  const {
    filePath,
    items: {
      [iconName]: { height, viewBox, width }
    }
  } = SPRITES_META[spriteName]
  const axis = width === height ? 'xy' : width > height ? 'x' : 'y'

  return { axis, filePath, iconName, viewBox }
}

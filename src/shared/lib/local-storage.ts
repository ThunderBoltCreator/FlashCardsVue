/**
 * Sets a value in local storage with the given key. If the value is an object or a function, it is stringified before being stored.
 *
 * @param {string} key - The key to store the value under.
 * @param {any} value - The value to store.
 * @return {void} This function does not return anything.
 */
export const setLocalStorage = (key: string, value: any): void => {
  if (typeof value === 'object' || typeof value === 'function') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

/**
 * Retrieves a value from local storage by key.
 * @param key The key of the value to retrieve.
 * @returns The parsed value if it exists, otherwise null.
 */
export const getLocalStorage = (key: string): NonNullable<unknown> | null => {
  const value: string | null = localStorage.getItem(key)

  if (value) {
    return JSON.parse(value)
  }

  return null
}

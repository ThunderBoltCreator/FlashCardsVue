export const setLocalStorage = (key: string, value: any) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key)

  if (value) {
    return JSON.parse(value)
  }

  return null
}

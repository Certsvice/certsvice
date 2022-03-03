import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
type Value = string | number | boolean | Object

export function useLocalStorage<T = Value>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      if (typeof window === 'undefined') return

      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const clearValue = () => {
    window && window.localStorage.removeItem(key)
    setStoredValue(initialValue)
  }

  const setValue = (value: T | ((oldValue: T | undefined) => T)) => {
    try {
      if (typeof window === 'undefined') return
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (value != null) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } else {
        clearValue()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue, clearValue] as const
}

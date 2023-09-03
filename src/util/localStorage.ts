
export const LocalStorageTypeValues = {
    user: 'User',
    product:'Product',
    newKey:'NewKey'   
} as const

export type LocalStorageType =
    (typeof LocalStorageTypeValues)[keyof typeof LocalStorageTypeValues]



export const getPersist = (key:LocalStorageType)=>{
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
        return undefined
    }
    try {
        const item = window.localStorage.getItem(key)
        return item ? (parseJSON(item)) : undefined
    } catch (error) {
        console.warn(`Error reading localStorage key “${key}”:`, error)
        return undefined
    }
}


// Return a wrapped version of useState's setter function that ...
// ... persists the new value to localStorage.
export function setPersist<T>(key: LocalStorageType, value: T) {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
        console.warn(
            `Tried setting localStorage key “${key}” even though environment is not a client`
        )
    }

    try {
        const newValue = value instanceof Function ? '' : value
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(newValue))
        // We dispatch a custom event so every useLocalStorage hook are notified
        window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error)
    }
}

// A wrapper for "JSON.parse()"" to support "undefined" value
export function parseJSON<T>(value: string | null): T | undefined {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value ?? '')
    } catch {
        console.log('parsing error on', { value })
        return undefined
    }
}

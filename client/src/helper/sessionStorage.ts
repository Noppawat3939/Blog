export const setSessionStorage = (key: string, initialValue: any) => {
    return sessionStorage.setItem(key, JSON.stringify(initialValue))
}

export const getSessionStorage = (key: string) => {
    const _key = sessionStorage.getItem(key)
    if (_key) {
        return JSON.parse(_key)
    }

    return null
}

export const removeSessionStorage = (key: string) => {
    return sessionStorage.removeItem(key)
}

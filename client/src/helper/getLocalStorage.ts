export const getLocalStorage = (value: string) => {
    const _value = window.localStorage.getItem(value)
    if (_value) {
        return JSON.parse(_value)
    }

    return null
}

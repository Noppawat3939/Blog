export const splitPath = (path?: string) => {
    if (path) {
        return path.split('/')[1]
    }

    return
}

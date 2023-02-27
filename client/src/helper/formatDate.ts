export const formatDate = (date?: string) => {
    const [, mm, d, yyyy] = new Date(date || '')
        .toString()
        .split(' ')
        .splice(0, 4)

    return `${mm} ${d} ${yyyy}`
}

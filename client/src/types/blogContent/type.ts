export type BlogContentProps = {
    cover: string
    title: string
    subtitle: string
    onReadMore: () => void
}

export interface BlogContentState {
    title: string
    subtitle: string
    cover: string
    content: string
    blogId: string
    updatedAt: string
}

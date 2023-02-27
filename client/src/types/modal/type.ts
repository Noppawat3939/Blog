export interface ModalProps {
    isOpen?: boolean
    title?: string
    subTitle?: string
    submitBtn?: string
    cancelBtn?: string
    onSubmit?: () => void
    onCancel?: () => void
}

import { ChangeEvent } from 'react'

export interface UploadImageProps {
    onChangeImage: (e: ChangeEvent<HTMLInputElement>) => void
}

import { Modal, CircularProgress } from '@mui/material'
import { memo } from 'react'
import { ModalLoadingProps } from '../../types'
import { Styles } from './styles'

const ModalLoading = (props: ModalLoadingProps): JSX.Element => {
    const { isOpen = false } = props

    return (
        <Modal open={isOpen} sx={Styles.modal}>
            <CircularProgress color="secondary" size={'60px'} />
        </Modal>
    )
}

export default memo(ModalLoading)

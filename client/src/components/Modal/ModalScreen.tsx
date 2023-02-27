import { Modal, Box, Typography, Button } from '@mui/material'
import { memo } from 'react'
import { Styles } from './styles'

import { ModalProps } from '../../types'

const ModalScreen = (props: ModalProps): JSX.Element => {
    const {
        isOpen = false,
        title,
        subTitle,
        submitBtn,
        cancelBtn,
        onSubmit,
        onCancel,
    } = props

    return (
        <Modal open={isOpen} sx={Styles.modal}>
            <Box sx={Styles.content}>
                <Typography
                    variant="h6"
                    component="h2"
                    mb={1}
                    textAlign="center"
                >
                    {title}
                </Typography>
                <Typography textAlign="center">{subTitle}</Typography>
                <Box sx={Styles.btnGroup}>
                    {onSubmit && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onSubmit}
                        >
                            {submitBtn || 'ok'}
                        </Button>
                    )}
                    {onCancel && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onCancel}
                        >
                            {cancelBtn || 'cancel'}
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}

export default memo(ModalScreen)

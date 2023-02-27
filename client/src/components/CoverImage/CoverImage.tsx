import { Box } from '@mui/material'
import { memo } from 'react'
import { ReactComponent as CloseIcon } from '../../assets/icons/close-circle-sharp.svg'
import { CoverImageProps } from '../../types'

const CoverImage = (props: CoverImageProps): JSX.Element => {
    const { image, onRemoveImage } = props

    return (
        <Box
            sx={{
                position: 'relative',
                height: '350px',
                width: '100%',
            }}
        >
            <CloseIcon
                onClick={onRemoveImage}
                style={{
                    width: 35,
                    height: 35,
                    cursor: 'pointer',
                    color: 'grey',
                    position: 'absolute',
                    right: '15px',
                    top: '15px',
                }}
            />
            <img
                src={image}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        </Box>
    )
}

export default memo(CoverImage)

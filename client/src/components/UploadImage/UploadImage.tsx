import { Typography, TextField } from '@mui/material'
import { ReactComponent as ImageIcon } from '../../assets/icons/image-outline.svg'
import { UploadImageProps } from '../../types'

const UploadImage = (props: UploadImageProps): JSX.Element => {
    const { onChangeImage } = props

    return (
        <Typography
            sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <TextField
                onChange={onChangeImage}
                type="file"
                sx={{
                    width: '100%',
                    opacity: 0,
                }}
            />
            <ImageIcon
                style={{
                    width: 40,
                    height: 40,
                    position: 'absolute',
                    color: '#CCC',
                }}
            />
        </Typography>
    )
}

export default UploadImage

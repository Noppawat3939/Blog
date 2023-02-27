import { Container, Typography } from '@mui/material'
import { memo } from 'react'
import { Styles } from './styles'

const Footer = (): JSX.Element => {
    return (
        <Container sx={Styles.footer}>
            <Typography sx={Styles.text}>
                &copy; {`${new Date().getFullYear()}`} my blog
            </Typography>
        </Container>
    )
}

export default memo(Footer)

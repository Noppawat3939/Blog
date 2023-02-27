import { Typography, Container, Button, Box, Avatar } from '@mui/material'
import Blog from '../../assets/images/blog.png'
import { memo, useEffect } from 'react'
import { Styles } from './styles'
import { useLocalStorage } from '../../hooks'
import { PATHS, STYLES } from '../../constants'
import { removeSessionStorage } from '../../helper'

const StarterPage = (): JSX.Element => {
    const [user] = useLocalStorage('user')

    useEffect(() => {
        window.localStorage.removeItem('user')
        removeSessionStorage('token')
    }, [])

    return (
        <Container maxWidth="xl" style={Styles.container}>
            <Avatar src={Blog} sx={Styles.image} />
            <Box sx={Styles.box}>
                <Box sx={Styles.boxTitle}>
                    <Typography
                        variant="h1"
                        sx={Styles.title}
                        color={STYLES.COLORS.DARK}
                    >
                        my
                    </Typography>
                    <Typography
                        color={STYLES.COLORS.PURPLE}
                        variant="h1"
                        sx={Styles.title}
                    >
                        blog
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    sx={Styles.btn}
                    color="secondary"
                    href={user ? PATHS.HOME : PATHS.LOGIN}
                >
                    get started
                </Button>
            </Box>
        </Container>
    )
}

export default memo(StarterPage)

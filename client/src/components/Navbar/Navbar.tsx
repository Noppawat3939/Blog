import {
    Container,
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
} from '@mui/material'
import { useState, MouseEvent, memo } from 'react'
import { STYLES, PATHS } from '../../constants'
import { useLocalStorage } from '../../hooks'
import { ReactComponent as CreateIcon } from '../../assets/icons/create-outline.svg'

import { useNavigate } from 'react-router-dom'
import { userAtom } from '../../stores'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { NavbarProps } from '../../types'

import { Styles } from './styles'
import { removeSessionStorage } from '../../helper'

const Navbar = (props: NavbarProps): JSX.Element => {
    const { showCreateBlog = true } = props

    const navigate = useNavigate()

    const {
        info: { id, image, username },
    } = useRecoilValue(userAtom)
    const resetUserAtom = useResetRecoilState(userAtom)

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const [user] = useLocalStorage('user')

    const settings = [
        { title: 'Profile', onClick: () => goToProfile(id) },
        { title: 'My Blog', onClick: () => goToMyBlog() },
        { title: 'Logout', onClick: () => onLogout() },
    ]

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const onLogout = () => {
        window.localStorage.clear()
        setTimeout(() => {
            resetUserAtom()
            removeSessionStorage('token')
            navigate(PATHS.LOGIN)
        }, 1200)
    }

    const goToMyBlog = () => navigate(`${PATHS.MY_BLOG}/${id}`)

    const goToProfile = (param: string) => navigate(`${PATHS.PROFILE}/${param}`)

    const goToHome = () => navigate(PATHS.HOME)

    const goToCreateBlog = () => navigate(`${PATHS.CREATE_BLOG}/${id}`)

    return (
        <AppBar position="sticky" sx={Styles.appBar}>
            <Container maxWidth="xl">
                <Toolbar disableGutters style={Styles.toolBar}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="button"
                        onClick={goToHome}
                        sx={Styles.logo}
                    >
                        MY BLOG
                    </Typography>

                    <Typography
                        variant="h5"
                        noWrap
                        component="button"
                        onClick={goToHome}
                        sx={Styles.logoMobile}
                    >
                        MY BLOG
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        {user?.isLogin ? (
                            <>
                                <Box sx={Styles.boxAvatar}>
                                    {showCreateBlog && (
                                        <Box sx={Styles.boxCreate}>
                                            <CreateIcon
                                                width={25}
                                                height={25}
                                                color={STYLES.COLORS.GREY}
                                            />
                                            <Typography
                                                fontSize={14}
                                                mr={4}
                                                sx={Styles.createBlog}
                                                textTransform="uppercase"
                                                onClick={goToCreateBlog}
                                                variant="button"
                                            >
                                                create
                                            </Typography>
                                        </Box>
                                    )}
                                    <Tooltip title="Open settings">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{
                                                p: 0,
                                            }}
                                        >
                                            <Avatar
                                                alt="profile"
                                                src={image}
                                                sx={Styles.avatar}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Box>

                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <Typography
                                        textAlign="center"
                                        mb={1}
                                        color={STYLES.COLORS.PURPLE}
                                        fontSize={14}
                                    >
                                        Welcome "{username}"
                                    </Typography>
                                    {settings.map(({ title, onClick }) => (
                                        <MenuItem
                                            key={title}
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography
                                                sx={{ width: 200 }}
                                                component="span"
                                                onClick={onClick}
                                                fontSize={13}
                                                color={STYLES.COLORS.DARK}
                                            >
                                                {title}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <Typography
                                color={STYLES.COLORS.WHITE}
                                component="a"
                                href={PATHS.LOGIN}
                                fontSize={15}
                            >
                                LOGIN
                            </Typography>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default memo(Navbar)

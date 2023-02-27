import {
    TextField,
    Typography,
    Button,
    Container,
    Box,
    IconButton,
    InputAdornment,
} from '@mui/material'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import Layout from '../../components/Layout/Layout'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { ChangeEvent, memo, useState } from 'react'
import { ENDPOINT, STYLES, PATHS } from '../../constants'
import { useLocalStorage } from '../../hooks'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import { userAtom } from '../../stores'
import { useRecoilState } from 'recoil'

import { Styles } from './styles'
import { setSessionStorage } from '../../helper'

const LoginPage = (): JSX.Element => {
    const navigate = useNavigate()

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
    const [usernameInput, setUsernameInput] = useState<string>('')
    const [passwordInput, setPasswordInput] = useState<string>('')

    const [userAtomState, setUserAtomState] = useRecoilState(userAtom)
    const [_, setUserStorage] = useLocalStorage('user')

    const showPassword = () => setIsShowPassword(!isShowPassword)

    const onUsernameInputChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setUsernameInput(e.target.value.replace(/ /g, ''))

    const onPasswordInputChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setPasswordInput(e.target.value.replace(/ /g, ''))

    const userLogin = async () => {
        const timeOut = 2500

        try {
            const headers = { 'Content-type': 'application/json' }
            const body = {
                username: usernameInput,
                password: passwordInput,
            }
            const { data } = await axios.post(ENDPOINT.LOGIN, body, {
                headers,
            })

            if (data.login) {
                toast.success('Login is Successful')
                const { accessToken, refreshToken } = data?.token

                setUserAtomState({
                    ...userAtomState,
                    token: { access: accessToken, refresh: refreshToken },
                })

                setUserStorage({ isLogin: true })
                setSessionStorage('token', { access: accessToken })
                setTimeout(() => {
                    navigate(PATHS.HOME)
                }, timeOut)
            }
        } catch (error) {
            console.error('🚀 error', error)
            toast.error('Username or Password is wrong')
        }
    }

    const isInputFill = !!usernameInput && !!passwordInput

    return (
        <Layout>
            <Container maxWidth="xl" sx={Styles.container}>
                <Box sx={Styles.box}>
                    <Typography variant="h2" mb={3} textAlign="center">
                        Login
                        <Typography variant="h4" color={STYLES.COLORS.PURPLE}>
                            My Blog
                        </Typography>
                    </Typography>

                    <TextField
                        required
                        variant="filled"
                        label="username"
                        size="small"
                        color="secondary"
                        value={usernameInput}
                        onChange={(event) => onUsernameInputChange(event)}
                    />

                    <TextField
                        required
                        id="margin-normal"
                        margin="normal"
                        value={passwordInput}
                        variant="filled"
                        label="password"
                        size="small"
                        type={isShowPassword ? 'text' : 'password'}
                        color="secondary"
                        onChange={(event) => onPasswordInputChange(event)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={showPassword}>
                                        {isShowPassword ? (
                                            <VisibilityOutlined color="secondary" />
                                        ) : (
                                            <VisibilityOffOutlined color="secondary" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        disabled={!isInputFill}
                        variant="contained"
                        color="secondary"
                        onClick={userLogin}
                    >
                        login
                    </Button>
                    <Typography
                        mt={2}
                        textAlign="end"
                        href={PATHS.REGISTER}
                        component="a"
                        fontSize={12}
                        color={STYLES.COLORS.DARK}
                    >
                        Don't have an account?
                    </Typography>
                </Box>
            </Container>
            <ToastMessage time={1500} />
        </Layout>
    )
}

export default memo(LoginPage)

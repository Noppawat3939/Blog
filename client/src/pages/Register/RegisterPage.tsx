import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import {
    Box,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    Button,
} from '@mui/material'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import { REGEX, ENDPOINT, PATHS, STYLES } from '../../constants'
import { object, string } from 'zod'

import {
    ShowPasswordState,
    RegisterInput,
    SuccessMessage,
    RegisterPayload,
} from '../../types'

import { Styles } from './styles'

const RegisterPage = (): JSX.Element => {
    const navigate = useNavigate()

    const registerSchema = object({
        username: string().min(REGEX.USERNAME.MIN, REGEX.ERR_MESSAGE.USER.MIN),
        email: string().email(REGEX.ERR_MESSAGE.EMAIL),
        password: string().min(
            REGEX.PASSWORD.MIN,
            REGEX.ERR_MESSAGE.PASSWORD.MIN
        ),
        passwordConfirm: string().min(
            REGEX.PASSWORD.MIN,
            REGEX.ERR_MESSAGE.PASSWORD.MIN
        ),
    }).refine(({ password, passwordConfirm }) => password === passwordConfirm, {
        path: ['passwordConfirm'],
        message: REGEX.ERR_MESSAGE.PASSWORD.NOT_MATCH,
    })

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    })

    useEffect(() => {
        if (isSubmitSuccessful) reset()
    }, [isSubmitSuccessful])

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        const data = {
            username: values.username,
            email: values.email,
            password: values.password,
        }

        handleRegister(data)
    }

    const [isShowPassword, setIsShowPassword] = useState<ShowPasswordState>({
        def: false,
        confirm: false,
    })
    const [usernameInput, setUsernameInput] = useState<string>('')

    const [emailInput, setEmailInput] = useState<string>('')
    const [passwordInput, setPasswordInput] = useState<string>('')
    const [confirmPassInput, setConfirmPassInput] = useState<string>('')
    const [successMsg, setSuccessMsg] = useState<SuccessMessage>({
        isShow: false,
        text: '',
        status: '',
    })

    const showPassword = () =>
        setIsShowPassword({ ...isShowPassword, def: !isShowPassword.def })

    const showPasswordConfirm = () =>
        setIsShowPassword({
            ...isShowPassword,
            confirm: !isShowPassword.confirm,
        })

    const onUsernameChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setUsernameInput(e.target.value.replace(/ /g, ''))

    const onEmailChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setEmailInput(e.target.value.replace(/ /g, ''))

    const onPasswordChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setPasswordInput(e.target.value.replace(/ /g, ''))

    const onConfirmPassChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setConfirmPassInput(e.target.value.replace(/ /g, ''))

    const handleRegister = async (payload: RegisterPayload) => {
        const timeOut = 2500

        const headers = {
            'Content-type': 'application/json',
        }

        const { data } = await axios.post(ENDPOINT.REGISTER, payload, {
            headers,
        })

        if (data.register) {
            setSuccessMsg({
                isShow: true,
                text: data.message,
                status: 'success',
            })
            setTimeout(() => {
                navigate(PATHS.LOGIN)
            }, timeOut)
        }

        if (!data.register) {
            setSuccessMsg({
                isShow: true,
                text: data.message,
                status: 'error',
            })
            setTimeout(() => {
                setSuccessMsg({
                    ...successMsg,
                    isShow: false,
                })
            }, timeOut)
        }

        return
    }

    const isInputFilled =
        !!usernameInput && !!passwordInput && !!confirmPassInput

    return (
        <Layout>
            <Container maxWidth="xl" sx={Styles.container}>
                <Box sx={Styles.box}>
                    <Typography
                        variant="h2"
                        textAlign="center"
                        mb={3}
                        color={STYLES.COLORS.DARK}
                    >
                        Register
                    </Typography>
                    <TextField
                        placeholder="username is more than 4 characters"
                        id="margin-normal"
                        margin="normal"
                        variant="filled"
                        label="username"
                        size="small"
                        color="secondary"
                        value={usernameInput}
                        {...register('username')}
                        error={!!errors['username']}
                        helperText={
                            errors['username'] && (
                                <span>errors['username'].message</span>
                            )
                        }
                        required
                        onChange={(event) => onUsernameChange(event)}
                    />
                    <TextField
                        id="margin-normal"
                        margin="normal"
                        variant="filled"
                        label="email"
                        size="small"
                        color="secondary"
                        type="email"
                        error={!!errors['email']}
                        helperText={
                            errors['email'] && (
                                <span>errors['email'].message</span>
                            )
                        }
                        {...register('email')}
                        value={emailInput}
                        required
                        onChange={(event) => onEmailChange(event)}
                    />
                    <TextField
                        placeholder="password is more than 6 characters"
                        id="margin-normal"
                        margin="normal"
                        variant="filled"
                        label="password"
                        size="small"
                        color="secondary"
                        required
                        error={!!errors['password']}
                        helperText={
                            errors['password'] && (
                                <span>errors['password'].message</span>
                            )
                        }
                        {...register('password')}
                        value={passwordInput}
                        onChange={(event) => onPasswordChange(event)}
                        type={isShowPassword.def ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={showPassword}>
                                        {isShowPassword.def ? (
                                            <VisibilityOutlined />
                                        ) : (
                                            <VisibilityOffOutlined />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="margin-normal"
                        margin="normal"
                        variant="filled"
                        label="confirm password"
                        size="small"
                        color="secondary"
                        required
                        error={!!errors['passwordConfirm']}
                        helperText={
                            errors['passwordConfirm'] && (
                                <span>errors['passwordConfirm']?.message</span>
                            )
                        }
                        {...register('passwordConfirm')}
                        value={confirmPassInput}
                        onChange={(event) => onConfirmPassChange(event)}
                        type={isShowPassword.confirm ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={showPasswordConfirm}>
                                        {isShowPassword.confirm ? (
                                            <VisibilityOutlined />
                                        ) : (
                                            <VisibilityOffOutlined />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        onClick={handleSubmit(onSubmitHandler)}
                        variant="contained"
                        color="secondary"
                        disabled={!isInputFilled}
                    >
                        register
                    </Button>
                    <Typography
                        color={
                            successMsg.status === 'success'
                                ? STYLES.COLORS.GREEN
                                : STYLES.COLORS.RED
                        }
                        variant="caption"
                        textAlign="center"
                        mt={1.5}
                        sx={{
                            transition: '.5s',
                            opacity: `${successMsg.isShow ? 1 : 0}`,
                        }}
                    >
                        {successMsg.text}
                    </Typography>
                </Box>
            </Container>
        </Layout>
    )
}

export default memo(RegisterPage)

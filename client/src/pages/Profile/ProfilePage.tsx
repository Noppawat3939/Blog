import Layout from '../../components/Layout/Layout'
import {
    Avatar,
    Container,
    Typography,
    Box,
    TextField,
    Button,
} from '@mui/material'
import Navbar from '../../components/Navbar/Navbar'

import { useRecoilState, useRecoilValue } from 'recoil'
import { ModalErrorAtom, userAtom } from '../../stores'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import { ENDPOINT, STATUS_CODE, PATHS, STYLES } from '../../constants'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import { Styles } from './styles'

const ProfilePage = (): JSX.Element => {
    const param = useParams()
    const navigate = useNavigate()

    const { info } = useRecoilValue(userAtom)
    const [modalErrAtomState, setModalErrAtomState] =
        useRecoilState(ModalErrorAtom)

    const [firstnameInput, setFirstNameInput] = useState<string>('')
    const [lastnameInput, setLastnameInput] = useState<string>('')
    const [emailInput, setEmailInput] = useState<string>('')
    const [usernameInput, setUsernameInput] = useState<string>('')
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [imageOverSize, setImageOverSize] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<string>('')

    useEffect(() => {
        if (info) {
            setFirstNameInput(info.firstName)
            setLastnameInput(info.lastName)
            setEmailInput(info.email)
            setUsernameInput(info.username)
            setSelectedImage(info.image)
        }

        document.title = 'Profile | My Blog'
    }, [])

    const handleChangeProfile = (event: any) => {
        const imgUrl = event.target.files[0]
        const maxSize = 50000

        if (imgUrl.size < maxSize) {
            const reader = new FileReader()
            reader.readAsDataURL(imgUrl)
            reader.onload = () => {
                setSelectedImage(reader?.result as any)
            }

            setImageOverSize(false)
        } else {
            setImageOverSize(true)
        }
    }

    const handleSaveProfile = async () => {
        try {
            let payload = {
                id: param.userId,
                username: usernameInput,
                firstName: firstnameInput,
                lastName: lastnameInput,
                email: emailInput,
                image: selectedImage,
            }
            const res = await axios.put(ENDPOINT.UPDATE_PROFILE, payload)

            if (res.status === STATUS_CODE.SUCCESS) {
                const timeOut = 1500

                toast.success('Update Profile is Successful')
                setTimeout(() => {
                    navigate(PATHS.HOME)
                }, timeOut)
            }

            setIsEditable(false)
        } catch (error) {
            console.error('error', error)
            const errorModal = {
                isOpen: true,
                title: 'Error',
                subtitle: error,
                submitBtn: 'ok',
                onSubmit: () => {
                    setModalErrAtomState({
                        ...modalErrAtomState,
                        isOpen: false,
                    })
                },
            }
            setModalErrAtomState(errorModal as any)
        }
    }

    const handleCancelEdit = () => {
        setIsEditable(false)
        setImageOverSize(false)
    }

    const handleFirstnameChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setFirstNameInput(e.target.value.replace(/ /g, ''))

    const handleLastnameChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setLastnameInput(e.target.value.replace(/ /g, ''))

    const handleEmailChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setEmailInput(e.target.value.replace(/ /g, ''))

    const handleUsernameChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setUsernameInput(e.target.value.replace(/ /g, ''))

    return (
        <>
            <Navbar />
            <Layout>
                <Container maxWidth="xl">
                    <Button
                        disabled={isEditable}
                        onClick={() => setIsEditable(true)}
                        color="secondary"
                        variant="outlined"
                        sx={Styles.editBtn}
                    >
                        edit
                    </Button>
                    <Typography textAlign="center" m={4} variant="h3">
                        My Profile
                    </Typography>
                    <Box sx={Styles.profile}>
                        <Avatar
                            alt="profile"
                            sx={Styles.image}
                            src={selectedImage ?? info.image}
                        />
                        {isEditable && (
                            <Box>
                                <TextField
                                    onChange={(e) => handleChangeProfile(e)}
                                    type="file"
                                    sx={Styles.inputFile}
                                />
                                <Typography
                                    sx={Styles.editProfile}
                                    variant="button"
                                >
                                    edit
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Typography
                        textAlign="center"
                        fontSize={10}
                        textTransform="uppercase"
                        color={
                            imageOverSize
                                ? STYLES.COLORS.RED
                                : STYLES.COLORS.GREY
                        }
                        m={1}
                    >
                        Cover image size should not exceed 50 kb.
                    </Typography>
                    <Box sx={Styles.inputBox}>
                        <TextField
                            disabled={!isEditable}
                            label="USERNAME"
                            id="margin-normal"
                            margin="normal"
                            value={usernameInput}
                            onChange={(e) => handleUsernameChange(e)}
                        />
                        <TextField
                            disabled={!isEditable}
                            label="FIRSTNAME"
                            id="margin-normal"
                            margin="normal"
                            value={firstnameInput}
                            onChange={(e) => handleFirstnameChange(e)}
                        />
                        <TextField
                            disabled={!isEditable}
                            label="LASTNAME"
                            id="margin-normal"
                            margin="normal"
                            value={lastnameInput}
                            onChange={(e) => handleLastnameChange(e)}
                        />
                        <TextField
                            disabled={!isEditable}
                            label="EMAIL"
                            id="margin-normal"
                            margin="normal"
                            value={emailInput}
                            onChange={(e) => handleEmailChange(e)}
                        />

                        {isEditable && (
                            <Box sx={Styles.btnGroup}>
                                <Button
                                    color="error"
                                    variant="outlined"
                                    onClick={handleCancelEdit}
                                    sx={Styles.cancelBtn}
                                >
                                    cancel
                                </Button>
                                <Button
                                    disabled={imageOverSize}
                                    variant="contained"
                                    onClick={handleSaveProfile}
                                    sx={Styles.saveBtn}
                                >
                                    save
                                </Button>
                            </Box>
                        )}
                    </Box>
                    <ToastMessage time={1500} />
                </Container>
            </Layout>
        </>
    )
}

export default memo(ProfilePage)

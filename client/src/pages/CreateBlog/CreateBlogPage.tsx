import { Box, Button, TextField, Typography } from '@mui/material'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Navbar from '../../components/Navbar/Navbar'
import Editor from '../../components/Editor/Editor'
import CoverImage from '../../components/CoverImage/CoverImage'
import UploadImage from '../../components/UploadImage/UploadImage'
import { useLocation, useNavigate } from 'react-router-dom'
import { PATHS, ENDPOINT, STATUS_CODE } from '../../constants'
import { splitPath } from '../../helper'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ModalErrorAtom, userAtom } from '../../stores'
import { Styles } from './styles'
import { toast } from 'react-toastify'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import axios from 'axios'

const CreateBlogPage = (): JSX.Element => {
    const navigate = useNavigate()

    const { info, token } = useRecoilValue(userAtom)
    const [modalErrAtomState, setModalErrAtomState] =
        useRecoilState(ModalErrorAtom)

    const { pathname } = useLocation()

    const [title, setTitle] = useState<string>('')

    const [subtitle, setSubtitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [coverImage, setCoverImage] = useState<string>('')
    const [showCreateBlog, setShowCreateBlog] = useState<boolean>(false)
    const [imageOverSize, setImageOverSize] = useState<boolean>(false)

    useEffect(() => {
        if (imageOverSize) {
            const errorImageOverSize = {
                isOpen: true,
                title: 'Your cover photo is too large.',
                subtitle: 'It should be less than 100 KB in size.',
                submitBtn: 'try again',
                onSubmit: () => {
                    setModalErrAtomState({
                        ...modalErrAtomState,
                        isOpen: false,
                    })
                    setImageOverSize(false)
                },
            }

            setModalErrAtomState(errorImageOverSize as any)
        }
    }, [imageOverSize])

    useEffect(() => {
        const currentPath = splitPath(pathname)

        if (![splitPath(PATHS.CREATE_BLOG)].includes(currentPath)) {
            setShowCreateBlog(true)
        }

        document.title = 'Create my blog'
    }, [])

    const handleImageChange = (event: any) => {
        const imgUrl = event.target.files[0]

        if (imgUrl.size > 100000) {
            setImageOverSize(true)

            return
        } else {
            const reader = new FileReader()
            reader.readAsDataURL(imgUrl)
            reader.onload = () => {
                setCoverImage(reader?.result as any)
            }

            setImageOverSize(false)
        }
    }

    const handleRemoveCoverImage = () => setCoverImage('')

    const createNewPost = async () => {
        const timeOut = 1500

        const payload = {
            id: info.id,
            title,
            subtitle,
            cover: coverImage,
            content,
        }
        try {
            const res = await axios.post(ENDPOINT.CREATE_BLOG, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token.access,
                },
            })

            if (res?.status === STATUS_CODE.SUCCESS) {
                toast.success('Create new post successful')

                setTimeout(() => {
                    navigate(PATHS.HOME)
                }, timeOut)
            }
        } catch (error) {
            const errServer = {
                isOpen: true,
                title: 'Error, something with wrong',
                subtitle: 'Please login again',
                submitBtn: 'login',
                onSubmit: () => {
                    const _timeOut = 1500
                    setModalErrAtomState({
                        ...modalErrAtomState,
                        isOpen: false,
                    })
                    setTimeout(() => {
                        navigate(PATHS.LOGIN)
                    }, _timeOut)
                },
            }
            setModalErrAtomState(errServer as any)
        }
    }

    const handleTitleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setTitle(e.target.value)
    }

    const handleSubtitleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setSubtitle(e.target.value)

    const isDisabled = !title || !subtitle || !content || !coverImage

    return (
        <>
            <Navbar showCreateBlog={showCreateBlog} />
            <ToastMessage time={1500} />
            <Layout>
                <Box sx={Styles.container}>
                    <Box sx={Styles.headerBar}>
                        <Typography>Draft in {info.username}</Typography>
                        <Button
                            disabled={isDisabled}
                            variant="contained"
                            onClick={createNewPost}
                            sx={Styles.saveBtn}
                        >
                            save
                        </Button>
                    </Box>
                    <TextField
                        placeholder="Title..."
                        color="secondary"
                        value={title}
                        margin="dense"
                        onChange={(e) => handleTitleChange(e)}
                    />
                    <TextField
                        placeholder="Subtitle..."
                        color="secondary"
                        margin="dense"
                        value={subtitle}
                        onChange={(e) => handleSubtitleChange(e)}
                    />
                    <Box sx={Styles.uploadCover}>
                        {!coverImage && (
                            <UploadImage
                                onChangeImage={(e) => handleImageChange(e)}
                            />
                        )}

                        {coverImage && (
                            <CoverImage
                                image={coverImage}
                                onRemoveImage={handleRemoveCoverImage}
                            />
                        )}
                    </Box>
                    <Editor
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                    />
                </Box>
            </Layout>
        </>
    )
}

export default memo(CreateBlogPage)

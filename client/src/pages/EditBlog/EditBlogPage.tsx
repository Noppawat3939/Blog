import axios from 'axios'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ENDPOINT, PATHS, STATUS_CODE } from '../../constants'
import Editor from '../../components/Editor/Editor'
import CoverImage from '../../components/CoverImage/CoverImage'
import UploadImage from '../../components/UploadImage/UploadImage'
import { TextField, Container, Box, Button } from '@mui/material'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { ModalErrorAtom } from '../../stores'

const EditBlogPage = (): JSX.Element => {
    const param = useParams()
    const navigate = useNavigate()

    const [modalErrAtomState, setModalErrAtomState] =
        useRecoilState(ModalErrorAtom)

    const [title, setTitle] = useState('')
    const [subtitle, setSubTitle] = useState('')
    const [content, setContent] = useState('')
    const [cover, setCover] = useState('')

    useEffect(() => {
        getEditBlog(param.id?.toString() || '')
    }, [])

    const getEditBlog = async (id: string) => {
        try {
            const res = await axios.get(`${ENDPOINT.GET_ID_BLOG}/${id}`)

            if (res.status === STATUS_CODE.SUCCESS) {
                const _blog = res.data.blog

                setTitle(_blog.title)
                setSubTitle(_blog.subtitle)
                setContent(_blog.content)
                setCover(_blog.cover)
            }
        } catch (error) {
            console.log('🚀🔥🔥🔥🚀 ==> error:', error)
        }
    }

    const handleEditBlog = async () => {
        const _timeOut = 1500

        const payload = {
            id: param.id,
            title,
            subtitle,
            cover,
            content,
        }
        try {
            const res = await axios.put(ENDPOINT.EDIT_BLOG, payload)

            console.log('🚀🔥🔥🔥🚀 ==> res:', res)
            if (res.status === STATUS_CODE.SUCCESS) {
                toast.success('Edit blog is Successful')
                setTimeout(() => {
                    navigate(PATHS.HOME)
                }, _timeOut)
            }
        } catch (error) {
            console.error('🚀🔥🔥🔥🚀 ==> error:', error)

            const errorModal = {
                isOpen: true,
                title: 'Error something with wrong',
                subtitle: 'Please login again',
                submitBtn: 'login',
                onSubmit: () => {
                    setModalErrAtomState({
                        ...modalErrAtomState,
                        isOpen: false,
                    })
                    setTimeout(() => {
                        navigate(PATHS.LOGIN)
                    }, _timeOut)
                },
            }

            setModalErrAtomState(errorModal as any)
        }
    }

    const onTitleChange = (
        evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setTitle(evt.target.value)

    const onSubtitleChange = (
        evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setSubTitle(evt.target.value)

    const onContentChange = (newContent: string) => setContent(newContent)

    const handleRemoveCover = () => {
        setCover('')
    }

    const handleEditCover = (e: any) => {
        const imgUrl = e.target.files[0]

        const reader = new FileReader()
        reader.readAsDataURL(imgUrl)

        reader.onload = () => {
            setCover(reader?.result as any)
        }
    }

    return (
        <>
            <Navbar />
            <ToastMessage />
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '30px 0',
                    }}
                >
                    EditBlogPage
                    <Button
                        color="success"
                        variant="contained"
                        onClick={handleEditBlog}
                        sx={{ borderRadius: '20px' }}
                    >
                        edit
                    </Button>
                </Box>
                <Box>
                    <TextField
                        fullWidth
                        placeholder="Title"
                        value={title}
                        onChange={(e) => onTitleChange(e)}
                    />
                    <TextField
                        fullWidth
                        placeholder="Subtitle"
                        value={subtitle}
                        onChange={(e) => onSubtitleChange(e)}
                    />
                    {!cover && (
                        <UploadImage
                            onChangeImage={(e) => handleEditCover(e)}
                        />
                    )}
                    {cover && (
                        <CoverImage
                            image={cover}
                            onRemoveImage={handleRemoveCover}
                        />
                    )}
                </Box>
                <Editor
                    value={content}
                    onChange={(newContent) => onContentChange(newContent)}
                />
            </Container>
            <Footer />
        </>
    )
}

export default memo(EditBlogPage)

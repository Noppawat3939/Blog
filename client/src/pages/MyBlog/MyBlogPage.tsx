import Navbar from '../../components/Navbar/Navbar'
import { Box, Button, Container, Typography } from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ModalErrorAtom, modalLoadingAtom, userAtom } from '../../stores'
import { ENDPOINT, PATHS, STATUS_CODE } from '../../constants'
import { memo, useEffect, useState } from 'react'
import BlogContent from '../../components/BlogContent/BlogContent'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../../components/Footer/Footer'

import { Styles } from './styles'

const MyBlogPage = (): JSX.Element => {
    const navigate = useNavigate()

    const {
        token,
        info: { id },
    } = useRecoilValue(userAtom)

    const [modalErrAtomState, setModalErrAtomState] =
        useRecoilState(ModalErrorAtom)

    const [modalLoadingAtomState, setModalLoadingAtomState] =
        useRecoilState(modalLoadingAtom)

    const [blogContent, setBlogContent] = useState([])

    const goToBlog = (param: string) => navigate(`${PATHS.BLOG}/${param}`)

    const goToCreateBlog = () => navigate(`${PATHS.CREATE_BLOG}/${id}`)

    const handleModalError = () => {
        setModalErrAtomState({
            ...modalErrAtomState,
            isOpen: false,
        })
        setTimeout(() => {
            navigate(PATHS.LOGIN)
            console.clear()
        }, 1500)
    }

    useEffect(() => {
        ;(async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: token.access,
                }
                setModalLoadingAtomState({ isOpen: true })
                const res = await axios.post(
                    ENDPOINT.GET_BLOG,
                    { id },
                    { headers }
                )

                if (res?.status === STATUS_CODE.SUCCESS) {
                    setBlogContent(res.data)
                    setModalLoadingAtomState({ isOpen: false })
                }

                if (res.status === STATUS_CODE.NO_DATA) {
                    console.warn(res.statusText)
                    setModalLoadingAtomState({ isOpen: false })
                }
            } catch (error) {
                console.error('🚀🔥🔥🔥🚀 ==> error', error)

                const errorModal = {
                    isOpen: true,
                    title: 'Error something with wrong',
                    subtitle: 'Please login again.',
                    submitBtn: 'login',
                    onSubmit: handleModalError,
                }

                setModalErrAtomState(errorModal as any)
                setModalLoadingAtomState({ isOpen: false })
            }
        })()

        document.title = 'Your Blog | My Blog'
    }, [])

    const isNoBlog = blogContent.length === 0

    return (
        <>
            <Navbar />
            <Container maxWidth="xl" sx={Styles.container}>
                {isNoBlog ? (
                    <Box sx={Styles.noBlogContainer}>
                        <Box textAlign="center">
                            <Typography
                                variant="h4"
                                mb={2}
                                sx={Styles.noBlogTitle}
                            >
                                Your blog is not found
                            </Typography>
                            <Typography variant="h5" mb={1}>
                                try create your first blog is here
                            </Typography>
                            <Button
                                onClick={goToCreateBlog}
                                variant="outlined"
                                color="secondary"
                                sx={Styles.noBlogBtn}
                            >
                                create your blog
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <>
                        {blogContent?.map((item: any, idx) => (
                            <BlogContent
                                key={`${item._id}_${idx}`}
                                {...item}
                                onReadMore={() => goToBlog(item._id)}
                            />
                        ))}
                    </>
                )}
            </Container>
            <Footer />
        </>
    )
}

export default memo(MyBlogPage)

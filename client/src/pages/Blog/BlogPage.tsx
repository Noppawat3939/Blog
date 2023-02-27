import { Avatar, Typography, Container, Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { mockBlog } from '../../data'
import { ENDPOINT, PATHS, STATUS_CODE, STYLES } from '../../constants'
import { memo, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ModalErrorAtom, userAtom } from '../../stores'
import { BlogContentState } from '../../types'
import { formatDate } from '../../helper'
import Menu from '../../components/Menu/Menu'
import axios from 'axios'
import Footer from '../../components/Footer/Footer'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { toast } from 'react-toastify'
import { ReactComponent as DeleteIcon } from '../../assets/icons/trash-outline.svg'
import { ReactComponent as EditIcon } from '../../assets/icons/create-outline.svg'

import { Styles } from './styles'

const BlogPage = (): JSX.Element => {
    const param = useParams()
    const navigate = useNavigate()

    const {
        token,
        info: { id, username, image },
    } = useRecoilValue(userAtom)
    const [modalErrAtomState, setModalErrAtomState] =
        useRecoilState(ModalErrorAtom)

    const [blogContent, setBlogContent] = useState<BlogContentState>()

    const handleErrServer = () => {
        const errServer = {
            isOpen: true,
            title: 'Error, Something with wrong',
            subtitle: 'Please login again',
            submitBtn: 'login',
            onSubmit: () => {
                setModalErrAtomState({
                    ...modalErrAtomState,
                    isOpen: false,
                })
                setTimeout(() => {
                    navigate(PATHS.LOGIN)
                    console.clear()
                }, 1500)
            },
        }
        setModalErrAtomState(errServer as any)
    }

    useEffect(() => {
        ;(async () => {
            try {
                const res = await axios.post(
                    ENDPOINT.GET_BLOG,
                    { id },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token.access,
                        },
                    }
                )

                if (res?.status === STATUS_CODE.SUCCESS) {
                    const findBlog = res?.data.find(
                        (b: any) => b?._id === param.blogId
                    )

                    setBlogContent(findBlog)
                }
                if (res.status === STATUS_CODE.ERR.UNAUTHORIZED) {
                    const errUnauthorized = {
                        isOpen: true,
                        title: 'Unauthorized',
                        subtitle: 'Please login again',
                        submitBtn: 'login',
                        onSubmit: () => {
                            setModalErrAtomState({
                                ...modalErrAtomState,
                                isOpen: false,
                            })
                            setTimeout(() => {
                                navigate(PATHS.LOGIN)
                            }, 1500)
                        },
                    }
                    setModalErrAtomState(errUnauthorized as any)
                }
            } catch (error) {
                console.log('🚀🔥🔥🔥🚀 ==> error', error)
                handleErrServer()
                return
            }
        })()
    }, [])

    const date = formatDate(blogContent?.updatedAt || new Date().toString())

    const handleDeleteBlog = async (id: string) => {
        try {
            const res = await axios.delete(`${ENDPOINT.DELETE_BLOG}/${id}`)

            if (res.status === STATUS_CODE.DELETE_SUCCESS) {
                const timeOut = 2000

                toast.success('Delete blog success')
                setModalErrAtomState({ ...modalErrAtomState, isOpen: false })

                setTimeout(() => {
                    navigate(PATHS.HOME)
                }, timeOut)
            }
        } catch (error) {
            console.log('🚀🔥🔥🔥🚀 ==> error', error)
            handleErrServer()
            return
        }
    }

    const onSelectDeleteOption = () => {
        const deleteModal = {
            isOpen: true,
            title: 'Are you sure ?',
            subtitle: 'Delete this blog.',
            onSubmit: () => handleDeleteBlog(param.blogId as string),
            onCancel: () =>
                setModalErrAtomState({ ...modalErrAtomState, isOpen: false }),
            submitBtn: 'sure',
        }

        setModalErrAtomState(deleteModal as any)
    }

    const onSelectEditOption = () => {
        navigate(`${PATHS.EDIT_BLOG}/${id}/${param.blogId}`)
    }

    const menuOptions = [
        {
            label: 'edit blog',
            onClick: () => {
                onSelectEditOption()
            },
            Icon: DeleteIcon,
        },
        {
            label: 'delete blog',
            onClick: () => {
                onSelectDeleteOption()
            },
            Icon: EditIcon,
        },
    ]

    return (
        <>
            <Navbar />
            <Container sx={Styles.container}>
                <ToastMessage />
                {blogContent ? (
                    <section key={`${blogContent?.blogId}`}>
                        <Typography
                            variant="h3"
                            mt={2}
                            mb={2}
                            sx={Styles.title}
                        >
                            {blogContent?.title}
                        </Typography>
                        <Box sx={Styles.underHeaderBox}>
                            <Box sx={Styles.userInfo}>
                                <Avatar src={image} />

                                <Box>
                                    <Typography sx={Styles.username}>
                                        by {username}
                                    </Typography>
                                    <Typography
                                        fontSize={13}
                                        color={STYLES.COLORS.GREY}
                                    >
                                        Last updated on {date}
                                    </Typography>
                                </Box>
                            </Box>
                            <Menu options={menuOptions} />
                        </Box>
                        <Avatar
                            src={blogContent?.cover}
                            alt="thumbnail"
                            sx={Styles.coverImg}
                        />
                        <Typography mb={2} pb={3} sx={Styles.subtitle}>
                            {blogContent.subtitle}
                        </Typography>
                        <Box
                            dangerouslySetInnerHTML={{
                                __html: blogContent.content,
                            }}
                        />
                    </section>
                ) : (
                    <>
                        {mockBlog.map((blog, idx) => {
                            if (blog.item.toString() === param.blogId) {
                                return (
                                    <section key={`${blog.item}${idx}`}>
                                        <Typography
                                            variant="h3"
                                            mt={2}
                                            mb={2}
                                            sx={Styles.title}
                                        >
                                            {blog.title}
                                        </Typography>
                                        <Box sx={Styles.underHeaderBox}>
                                            <Avatar src={blog.profile} />
                                            <Box>
                                                <Typography
                                                    sx={Styles.username}
                                                >
                                                    by {blog.username}
                                                </Typography>
                                                <Typography
                                                    fontSize={13}
                                                    color={STYLES.COLORS.GREY}
                                                >
                                                    Last updated on Jan 30, 2023
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Avatar
                                            src={blog.cover}
                                            alt="thumbnail"
                                            sx={Styles.coverImg}
                                        />
                                        <Typography
                                            mb={2}
                                            pb={3}
                                            sx={Styles.subtitle}
                                        >
                                            {blog.subtitle}
                                        </Typography>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: blog.content,
                                            }}
                                        ></div>
                                    </section>
                                )
                            }
                        })}
                    </>
                )}
                <Footer />
            </Container>
        </>
    )
}

export default memo(BlogPage)

import { Grid } from '@mui/material'
import Navbar from '../../components/Navbar/Navbar'
import BlogContent from '../../components/BlogContent/BlogContent'
import Layout from '../../components/Layout/Layout'
import { useLocalStorage } from '../../hooks'
import { memo, useEffect, useState } from 'react'
import { ENDPOINT, STATUS_CODE, PATHS } from '../../constants'
import ModalScreen from '../../components/Modal/ModalScreen'

import axios from 'axios'
import { userAtom } from '../../stores'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { ModalProps } from '../../types'

import { mockBlog } from '../../data'
import Footer from '../../components/Footer/Footer'
import { getSessionStorage } from '../../helper'

const HomePage = (): JSX.Element => {
    const navigate = useNavigate()

    const [userAtomState, setUserAtomState] = useRecoilState(userAtom)

    const tokenStorage = getSessionStorage('token')

    const resetUserAtom = useResetRecoilState(userAtom)
    const [user, setUserStorage] = useLocalStorage('user')

    const [modalErr, setModalErr] = useState<ModalProps>({
        isOpen: false,
        title: '',
        subTitle: '',
        submitBtn: '',
        onSubmit: () => {},
    })

    const handleSubmitModal = () => {
        setModalErr({ ...modalErr, isOpen: false })
        setUserStorage({ isLogin: false })
        setTimeout(() => {
            resetUserAtom()
            navigate(PATHS.LOGIN)
        }, 500)
    }

    useEffect(() => {
        if (user?.isLogin) {
            ;(async () => {
                try {
                    const headers = {
                        'Content-type': 'application/json',
                        Authorization:
                            userAtomState.token.access || tokenStorage.access,
                    }
                    const res = await axios.post(ENDPOINT.ME, {}, { headers })

                    if (res.status === STATUS_CODE.SUCCESS) {
                        setUserAtomState({ ...userAtomState, info: res.data })
                    }
                } catch (error: any) {
                    if (
                        error.response.status === STATUS_CODE.ERR.UNAUTHORIZED
                    ) {
                        setModalErr({
                            ...modalErr,
                            isOpen: true,
                            title: 'Unauthorized',
                            subTitle: 'Session is expired, Please login again',
                            submitBtn: 'login',
                            onSubmit: handleSubmitModal,
                        })
                    }
                }
            })()
        }

        if (!user?.isLogin) {
            setModalErr({
                ...modalErr,
                isOpen: true,
                title: 'Unauthorized',
                subTitle: 'Session is expired, Please login again',
                submitBtn: 'login',
                onSubmit: handleSubmitModal,
            })
        }

        document.title = 'Home | My Blog'
    }, [])

    const goToBlog = (param: number) => navigate(`${PATHS.BLOG}/${param}`)

    return (
        <>
            <Navbar />
            <Layout>
                <Grid
                    container
                    spacing={{ xs: 2, md: 1 }}
                    columns={{ xs: 4, sm: 8, md: 1 }}
                >
                    {mockBlog.map((value, index) => (
                        <Grid container spacing={3} key={index}>
                            <BlogContent
                                {...value}
                                onReadMore={() => goToBlog(index + 1)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Layout>
            <Footer />
            <ModalScreen
                isOpen={modalErr.isOpen}
                title={modalErr.title || ''}
                subTitle={modalErr.subTitle || ''}
                onSubmit={modalErr.onSubmit}
                submitBtn={modalErr.submitBtn}
            />
        </>
    )
}

export default memo(HomePage)

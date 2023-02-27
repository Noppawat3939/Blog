import { lazy, Suspense, startTransition } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PATHS } from '../constants'

import { ProtectRoute } from '../hooks'
import { getLocalStorage } from '../helper'

import StarterPage from '../pages/Starter/StarterPage'
import ErrorPage from '../pages/Error/ErrorPage'
import HomePage from '../pages/Home/HomePage'
import LoginPage from '../pages/Login/LoginPage'
import RegisterPage from '../pages/Register/RegisterPage'
import ProfilePage from '../pages/Profile/ProfilePage'
import BlogPage from '../pages/Blog/BlogPage'
import CreateBlogPage from '../pages/CreateBlog/CreateBlogPage'
import MyBlogPage from '../pages/MyBlog/MyBlogPage'
import EditBlogPage from '../pages/EditBlog/EditBlogPage'

const router = createBrowserRouter([
    {
        path: PATHS.INDEX,
        element: <StarterPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: PATHS.HOME,
        element: <HomePage />,
    },

    {
        path: PATHS.LOGIN,
        element: <LoginPage />,
    },
    {
        path: PATHS.REGISTER,
        element: <RegisterPage />,
    },
    {
        path: `${PATHS.PROFILE}/:userId`,
        element: (
            <ProtectRoute isAllow={getLocalStorage('user')}>
                <ProfilePage />
            </ProtectRoute>
        ),
    },
    {
        path: `${PATHS.CREATE_BLOG}/:userId`,
        element: (
            <ProtectRoute isAllow={getLocalStorage('user')}>
                <CreateBlogPage />
            </ProtectRoute>
        ),
    },
    {
        path: `${PATHS.BLOG}/:blogId`,
        element: (
            <ProtectRoute isAllow={getLocalStorage('user')}>
                <BlogPage />
            </ProtectRoute>
        ),
    },
    {
        path: `${PATHS.MY_BLOG}/:id`,
        element: (
            <ProtectRoute isAllow={getLocalStorage('user')}>
                <MyBlogPage />
            </ProtectRoute>
        ),
    },
    {
        path: `${PATHS.EDIT_BLOG}/:user/:id`,
        element: (
            <ProtectRoute isAllow={getLocalStorage('user')}>
                <EditBlogPage />
            </ProtectRoute>
        ),
    },
])
export default router

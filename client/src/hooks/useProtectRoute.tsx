import { Navigate } from 'react-router-dom'
import { PATHS } from '../constants'
import { getLocalStorage } from '../helper'

interface ProtectRouteProps {
    isAllow: boolean
    children: JSX.Element
}

export const ProtectRoute = ({ isAllow, children }: ProtectRouteProps) => {
    let user = getLocalStorage('user')

    if (isAllow || user?.isLogin) {
        return children
    }

    return <Navigate to={PATHS.LOGIN} replace />
}

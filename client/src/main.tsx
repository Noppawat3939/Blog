import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import ModalError from './feature/ModalError/ModalError'
import Loading from './feature/Loading/Loading'

import router from './routes/Routes'

import './styles/main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RecoilRoot>
            <RouterProvider router={router} />
            <ModalError />
            <Loading />
        </RecoilRoot>
    </React.StrictMode>
)

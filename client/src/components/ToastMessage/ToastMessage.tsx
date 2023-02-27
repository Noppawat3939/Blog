import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastMessageProps {
    time?: number
}

const ToastMessage = (props: ToastMessageProps): JSX.Element => {
    const { time = 2000 } = props

    return <ToastContainer autoClose={time} position="top-center" />
}

export default ToastMessage

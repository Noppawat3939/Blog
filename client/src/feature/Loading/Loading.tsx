import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import ModalLoading from '../../components/ModalLoading/ModalLoading'
import { modalLoadingAtom } from '../../stores'

const Loading = (): JSX.Element => {
    const { isOpen } = useRecoilValue(modalLoadingAtom)

    return <ModalLoading isOpen={isOpen} />
}

export default memo(Loading)

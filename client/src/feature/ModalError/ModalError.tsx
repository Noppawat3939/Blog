import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import ModalScreen from '../../components/Modal/ModalScreen'
import { ModalErrorAtom } from '../../stores'

const ModalError = (): JSX.Element => {
    const {
        isOpen,
        title,
        subtitle,
        onCancel,
        onSubmit,
        submitBtn,
        cancelBtn,
    } = useRecoilValue(ModalErrorAtom)

    return (
        <ModalScreen
            isOpen={isOpen}
            title={title}
            subTitle={subtitle}
            cancelBtn={cancelBtn}
            submitBtn={submitBtn}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    )
}

export default memo(ModalError)

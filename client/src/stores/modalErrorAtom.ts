import { atom } from 'recoil'

export const ModalErrorAtom = atom({
    key: 'ModalErrorAtom',
    default: {
        isOpen: false,
        title: '',
        subtitle: '',
        submitBtn: '',
        cancelBtn: '',
        onSubmit: () => {},
        onCancel: () => {},
    },
})

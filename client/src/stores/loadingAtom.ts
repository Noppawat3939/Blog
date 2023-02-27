import { atom } from 'recoil'

export const modalLoadingAtom = atom({
    key: 'modalLoadingAtom',
    default: {
        isOpen: false,
    },
})

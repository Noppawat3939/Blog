import { atom } from 'recoil'

export const userAtom = atom({
    key: 'userAtom',
    default: {
        token: { access: '', refresh: '' },
        info: {
            id: '',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            image: '',
        },
    },
})

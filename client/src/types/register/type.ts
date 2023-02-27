import { TypeOf } from 'zod'

export type ShowPasswordState = {
    def: boolean
    confirm: boolean
}

export type RegisterPayload = {
    username: string
    password: string
}

export type SuccessMessage = {
    isShow?: boolean
    text?: string
    status?: string
}

export type RegisterInput = TypeOf<any>

import { FunctionComponent, SVGProps } from 'react'

export type Options = {
    label: string
    onClick: (evt: string) => void
    Icon?: FunctionComponent<SVGProps<SVGSVGElement>>
}

export interface MenuProps {
    options: Options[]
}

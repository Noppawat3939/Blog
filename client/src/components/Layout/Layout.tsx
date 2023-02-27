import { Container } from '@mui/material'
import { memo } from 'react'
import { LayoutProp } from '../../types'

const Layout = (props: LayoutProp): JSX.Element => {
    const { children } = props

    return <Container maxWidth="xl">{children}</Container>
}

export default memo(Layout)

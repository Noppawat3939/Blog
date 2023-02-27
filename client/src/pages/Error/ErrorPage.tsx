import { useRouteError } from 'react-router-dom'
import { Container, Box, Typography, Button } from '@mui/material'
import Layout from '../../components/Layout/Layout'
import { memo } from 'react'

import { Styles } from './styles'
import { ErrorResponse } from '../../types'

const isError = (error: any): error is ErrorResponse => {
    return 'data' in error && 'status' in error && 'statusText' in error
}

const ErrorPage = () => {
    const error: any = useRouteError()

    return (
        <Layout>
            {isError(error) && (
                <Container sx={Styles.container}>
                    <Box sx={Styles.box}>
                        <Typography
                            variant="h3"
                            fontWeight={600}
                            mb={1}
                        >{`Oops! ${error.status}`}</Typography>
                        <Typography variant="h6" mb={1}>{`${
                            error.statusText || error.message
                        }`}</Typography>
                        <Typography mb={2}>
                            Sorry, an unexpected error has occurred.
                        </Typography>
                        <Button href="/" color="secondary" size="small">
                            back
                        </Button>
                    </Box>
                </Container>
            )}
        </Layout>
    )
}

export default memo(ErrorPage)

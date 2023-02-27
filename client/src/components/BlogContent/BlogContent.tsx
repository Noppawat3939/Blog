import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CardActions,
} from '@mui/material'
import { memo } from 'react'
import { BlogContentProps } from '../../types'

import { Styles } from './styles'

const BlogContent = (props: BlogContentProps): JSX.Element => {
    const { title, subtitle, onReadMore, cover } = props

    return (
        <Card sx={Styles.card}>
            <CardMedia component="img" height={200} image={cover} />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    onClick={onReadMore}
                    sx={Styles.title}
                    component="button"
                >
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {subtitle?.substring(0, 150) + '...'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="secondary" onClick={onReadMore}>
                    read more
                </Button>
            </CardActions>
        </Card>
    )
}

export default memo(BlogContent)

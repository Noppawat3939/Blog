import { STYLES } from '../../constants'

export const Styles = {
    card: {
        width: '60%',
        margin: '20px auto 30px',
        height: 'auto',
    },
    title: {
        background: 'none',
        border: 0,
        cursor: 'pointer',
        transition: '.3s',
        '&:hover': {
            color: STYLES.COLORS.PURPLE,
        },
    },
}

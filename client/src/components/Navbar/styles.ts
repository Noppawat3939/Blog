import { STYLES } from '../../constants'

export const Styles = {
    appBar: {
        background: STYLES.COLORS.WHITE,
        boxShadow: 'none',
        borderBottom: `.5px solid ${STYLES.COLORS.LIGHT_GREY}`,
    },
    logo: {
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontWeight: 700,
        color: STYLES.COLORS.DARK,
        textDecoration: 'none',
        backgroundColor: 'transparent',
        border: 'none',
    },
    logoMobile: {
        mr: 2,
        display: { xs: 'flex', md: 'none' },
        flexGrow: 1,
        fontWeight: 700,
        color: STYLES.COLORS.DARK,
        textDecoration: 'none',
        backgroundColor: 'transparent',
        border: 'none',
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    boxAvatar: {
        display: 'flex',
        alignItems: 'center',
    },
    boxCreate: {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    avatar: {
        width: 36,
        height: 36,
    },
    createBlog: {
        color: STYLES.COLORS.GREY,
        cursor: 'pointer',
        transition: '.5s',
        ':hover&': {
            opacity: 0.6,
        },
    },
}

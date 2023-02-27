import { STYLES } from '../../constants'

export const Styles = {
    title: {
        fontFamily: 'Inter, system-ui, Helvetica, Arial, sans-serif',
        textTransform: 'capitalize',
    },
    underHeaderBox: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        columnGap: 2,
    },
    username: {
        textTransform: 'capitalize',
        color: STYLES.COLORS.PURPLE,
    },
    coverImg: {
        width: '100%',
        height: '450px',
        objectFit: 'cover',
        borderRadius: 0,
        margin: '20px 0',
    },
    subtitle: {
        textAlign: 'center',
        borderBottom: `.4px solid ${STYLES.COLORS.GREY}`,
        fontFamily: 'Inter, system-ui, Helvetica, Arial, sans-serif',
    },
    container: {
        height: '100vh',
    },
    noBlogUserInfo: {
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',
    },
}

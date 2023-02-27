import { STYLES } from '../../constants'

export const Styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '30px 0',
    },
    headerBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    saveBtn: {
        background: STYLES.COLORS.GREEN,
        borderRadius: 20,
        ':hover&': {
            backgroundColor: STYLES.COLORS.GREEN,
        },
    },
    uploadCover: {
        width: '100%',
        border: `dotted 1.5px ${STYLES.COLORS.GREY}`,
        borderRadius: '4px',
    },
}

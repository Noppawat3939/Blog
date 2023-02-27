import { STYLES } from '../../constants'

export const Styles = {
    footer: {
        height: '10vh',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTop: `.4px solid ${STYLES.COLORS.GREY}`,
        marginTop: 10,
    },
    text: {
        fontSize: 13,
        textTransform: 'uppercase',
        color: STYLES.COLORS.DARK,
    },
}

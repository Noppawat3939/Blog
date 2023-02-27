import { STYLES } from '../../constants'

export const Styles = {
    editBtn: {
        right: 20,
        position: 'absolute',
        borderRadius: 20,
    },
    profile: {
        width: 200,
        height: 200,
        marginLeft: '50%',
        translate: '-50%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    inputBox: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 450,
        margin: 'auto',
    },
    inputFile: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        translate: '-50%',
        width: 100,
        opacity: 0,
    },
    editProfile: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        translate: '-50%',
        transition: '.5s',
        fontWeight: 'bold',
        cursor: 'pointer',
        opacity: 0.4,
        ':hover': {
            opacity: 1,
        },
    },
    btnGroup: {
        display: 'flex',
        justifyContent: 'center',
        columnGap: '20px',
    },
    saveBtn: {
        width: 100,
        margin: '20px 0',
        borderRadius: 20,
        backgroundColor: STYLES.COLORS.GREEN,
        ':hover': {
            backgroundColor: STYLES.COLORS.GREEN,
        },
    },
    cancelBtn: {
        width: 100,
        margin: '20px 0',
        borderRadius: 20,
    },
}

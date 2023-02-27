import { memo, useState, MouseEvent } from 'react'
import { Menu as MenuMui, MenuItem, IconButton, Box } from '@mui/material'

import { ReactComponent as MoreIcon } from '../../assets/icons/more.svg'
import { STYLES } from '../../constants'
import { MenuProps } from '../../types'
import { Styles } from './styles'

const Menu = (props: MenuProps): JSX.Element => {
    const { options } = props

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const open = Boolean(anchorEl)
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreIcon width={25} height={25} color={STYLES.COLORS.GREY} />
            </IconButton>
            <MenuMui
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '20ch',
                    },
                }}
            >
                {options?.map(({ label, onClick, Icon }) => (
                    <MenuItem
                        sx={Styles.item}
                        key={label}
                        selected={label === 'Pyxis'}
                        onClick={() => {
                            onClick(label)
                            handleClose()
                        }}
                    >
                        {label}
                        {Icon && <Icon width={20} height={20} />}
                    </MenuItem>
                ))}
            </MenuMui>
        </Box>
    )
}

export default memo(Menu)

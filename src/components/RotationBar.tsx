import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import { IconButton } from '@mui/material'
import React, { FunctionComponent } from 'react'


export const RotationBar: FunctionComponent<{ clickLeft: () => void, clickRight: () => void }> = props => {
    return (
        <div className="bar-root">
            <IconButton className="bar-button-item-l" style={{ color: 'black' }} onClick={() => props.clickLeft()}><RotateLeftIcon className="bar-icon-item" /></IconButton>
            <IconButton className="bar-button-item-r" style={{ color: 'black' }} onClick={() => props.clickRight()}><RotateRightIcon className="bar-icon-item" /></IconButton>
        </div>
    )
}



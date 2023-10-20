import { IconButton } from '@mui/material'
import React, { FunctionComponent } from 'react'
import { RotateLeftIcon, RotateRightIcon } from './Icons'


export const RotationBar: FunctionComponent<{ clickLeft: () => void, clickRight: () => void }> = props => {
    return (
        <div className="bar-root">
            <IconButton className="bar-button-item-l" style={{ color: 'black' }} onClick={() => props.clickLeft()}><RotateLeftIcon /></IconButton>
            <IconButton className="bar-button-item-r" style={{ color: 'black' }} onClick={() => props.clickRight()}><RotateRightIcon /></IconButton>
        </div>
    )
}



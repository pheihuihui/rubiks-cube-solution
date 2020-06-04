import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import RotateRightIcon from '@material-ui/icons/RotateRight'
import { IconButton, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles({
    root: {
        height: '30px',
        width: '120px',
        display: 'flex',
        justifyContent: 'center',
        background: 'silver',
        position: 'relative',
        bottom: '-15px',
        borderRadius: 20,
        border: '1px solid black'
    }
})

export const RotationBar = (props: { clickLeft: () => void, clickRight: () => void }) => {

    const stl = useStyle()

    return (
        <div className={stl.root}>
            <IconButton style={{ color: 'black' }} onClick={() => props.clickLeft()}><RotateLeftIcon /></IconButton>
            <IconButton style={{ color: 'black' }} onClick={() => props.clickRight()}><RotateRightIcon /></IconButton>
        </div>
    )
}



import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import RotateRightIcon from '@material-ui/icons/RotateRight'
import { IconButton, makeStyles } from '@material-ui/core'
import React from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { useWindowScale } from '../util/hooks'

const useStyle = makeStyles<Theme, { scale: number }>({
    root: props => ({
        height: 30 * props.scale,
        width: 120 * props.scale,
        display: 'flex',
        justifyContent: 'center',
        background: 'silver',
        position: 'relative',
        bottom: - 15 * props.scale,
        borderRadius: 20 * props.scale,
        boxShadow: '2px 2px 2px #6d6d6d, -2px -2px 2px #44aca5'
    })
})

export const RotationBar = (props: { clickLeft: () => void, clickRight: () => void }) => {

    const sc = useWindowScale()
    const stl = useStyle({ scale: sc })

    return (
        <div className={stl.root}>
            <IconButton style={{ color: 'black' }} onClick={() => props.clickLeft()}><RotateLeftIcon /></IconButton>
            <IconButton style={{ color: 'black' }} onClick={() => props.clickRight()}><RotateRightIcon /></IconButton>
        </div>
    )
}



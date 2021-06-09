import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import RotateRightIcon from '@material-ui/icons/RotateRight'
import { IconButton, makeStyles } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { useWindowScale } from '../util/hooks'

const useStyle = makeStyles<Theme, { scale: number }, 'root' | 'iconItem' | 'buttonItemL' | 'buttonItemR'>({
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
    }),
    iconItem: props => ({
        height: 30 * props.scale,
        width: 30 * props.scale,
        paddingBottom: 20 - props.scale * 20
    }),
    buttonItemL: props => ({
        height: 30 * props.scale,
        width: 30 * props.scale,
        paddingRight: 20 * props.scale,
    }),
    buttonItemR: props => ({
        height: 30 * props.scale,
        width: 30 * props.scale,
        paddingLeft: 20 * props.scale,
    })
})

export const RotationBar: FunctionComponent<{ clickLeft: () => void, clickRight: () => void }> = props => {

    const sc = useWindowScale()
    const sty = useStyle({ scale: sc })

    return (
        <div className={sty.root}>
            <IconButton className={sty.buttonItemL} style={{ color: 'black' }} onClick={() => props.clickLeft()}><RotateLeftIcon className={sty.iconItem} /></IconButton>
            <IconButton className={sty.buttonItemR} style={{ color: 'black' }} onClick={() => props.clickRight()}><RotateRightIcon className={sty.iconItem} /></IconButton>
        </div>
    )
}



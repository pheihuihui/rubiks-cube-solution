import React, { useState, useContext, useEffect, FunctionComponent } from 'react'
import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { TRubiksCubeOrientation, cubeOrientationAndColors } from '../model/RubiksCube'
import { ContextHub } from './AllFaces'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { useWindowScale } from '../util/hooks'
import { cssFaceColors } from '../util/utilities'
import { currentPlaneView } from '../util/constants'

const useStyle = makeStyles<Theme, { scale: number }, 'root'>({
    root: props => ({
        minWidth: 1,
        minHeight: 1,
        width: 48 * props.scale,
        height: 48 * props.scale,
        borderRadius: 10 * props.scale,
        boxShadow: '2px 2px 6px #6d6d6d, -2px -2px 6px #ffffff'
    })
})

export const CubieFace: FunctionComponent<{ initialColor?: string, disabled?: boolean, orien: TRubiksCubeOrientation, position: number }> = props => {

    const sc = useWindowScale()
    const [color, setColor] = useState(props.initialColor ?? 'black')
    const [anchor_colorPicker, setAnchor_colorPicker] = useState<null | HTMLElement>(null)
    const currentColorCtx = useContext(ContextHub).facesContext
    const center = cubeOrientationAndColors[props.orien]

    useEffect(() => {
        if (props.position > -1) {
            let col = currentColorCtx.cubeState[center][props.position]
            setColor(cssFaceColors[col])
        }
    }, [currentColorCtx.cubeState])

    const fclass = useStyle({ scale: sc })

    const handlePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor_colorPicker(event.currentTarget)
    }

    const handleColor = (c: string) => {
        setColor(c)
        currentPlaneView.updateCurrent(props.orien, props.position, c)
        setAnchor_colorPicker(null)
    }

    const handleClose = () => {
        setAnchor_colorPicker(null)
    }

    return (
        <div>
            <Button disabled={props.disabled} style={{ background: color }} className={fclass.root} onClick={handlePicker}> </Button>
            <Menu id="color_picker" anchorEl={anchor_colorPicker} open={Boolean(anchor_colorPicker)} onClose={handleClose}>
                {Object.values(cssFaceColors).map(x => <MenuItem key={'face_' + x} style={{ width: 80, height: 40, background: x }} onClick={() => handleColor(x)} />)}
            </Menu>
        </div>
    )
}

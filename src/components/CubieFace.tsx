import React, { useState, useContext, useEffect } from 'react'
import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { TRubiksCubeOrientation, CubeOrientationAndColors } from '../model/RubiksCube'
import { ContextHub } from './AllFaces'
import { cssFaceColors } from '..'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { useWindowScale } from '../util/hooks'

const useStyle = makeStyles<Theme, { scale: number }>({
    root: props => ({
        minWidth: 1,
        minHeight: 1,
        width: 48 * props.scale,
        height: 48 * props.scale,
        borderRadius: 10 * props.scale,
        boxShadow: '2px 2px 6px #6d6d6d, -2px -2px 6px #ffffff'
    })
})

export const CubieFace = (props: { initialColor?: string, disabled?: boolean, orien: TRubiksCubeOrientation, position: number }) => {

    const sc = useWindowScale()
    const [color, setColor] = useState(props.initialColor ?? 'black')
    const [anchor_colorPicker, setAnchor_colorPicker] = useState<null | HTMLElement>(null)
    const currentColorCtx = useContext(ContextHub).facesContext
    const center = CubeOrientationAndColors[props.orien]

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

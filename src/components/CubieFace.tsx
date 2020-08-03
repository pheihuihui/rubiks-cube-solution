import React, { useState, useContext, useEffect } from 'react'
import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { TRubiksCubeOrientation, CubeOrientationAndColors } from '../model/RubiksCube'
import { ContextHub } from './AllFaces'
import { CssFaceColors } from '../util/Utilities'

const useStyle = makeStyles({
    root: {
        minWidth: 10,
        minHeight: 10,
        width: 48,
        height: 48,
        borderRadius: 10,
        boxShadow: '2px 2px 6px #6d6d6d, -2px -2px 6px #ffffff'
    }
})

export const CubieFace = (props: { initialColor?: string, disabled?: boolean, orien: TRubiksCubeOrientation, position: number }) => {

    const [color, setColor] = useState(props.initialColor ?? 'black')
    const [anchor_colorPicker, setAnchor_colorPicker] = useState<null | HTMLElement>(null)
    const currentColorCtx = useContext(ContextHub).facesContext
    const center = CubeOrientationAndColors[props.orien]

    useEffect(() => {
        if (props.position > -1) {
            let col = currentColorCtx.cubeState[center][props.position]
            setColor(CssFaceColors[col])
        }
    }, [currentColorCtx.cubeState])

    const fclass = useStyle()

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
                {Object.values(CssFaceColors).map(x => <MenuItem key={'face_' + x} style={{ width: 80, height: 40, background: x }} onClick={() => handleColor(x)} />)}
            </Menu>
        </div>
    )
}

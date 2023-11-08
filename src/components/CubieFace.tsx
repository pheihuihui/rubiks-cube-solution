import React, { useState, useContext, useEffect, FC, MouseEvent } from "react"
import { Menu, MenuItem } from "@mui/material"
import { TRubiksCubeOrientation, cubeOrientationAndColors } from "../model/RubiksCube"
import { ContextHub } from "./AllFaces"
import { cssFaceColors } from "../util/utilities"
import { currentPlaneView } from "../util/constants"

export const CubieFace: FC<{ initialColor?: string; disabled?: boolean; orien: TRubiksCubeOrientation; position: number }> = (props) => {
	const [color, setColor] = useState(props.initialColor ?? "black")
	const [anchor_colorPicker, setAnchor_colorPicker] = useState<null | HTMLElement>(null)
	const currentColorCtx = useContext(ContextHub).facesContext
	const center = cubeOrientationAndColors[props.orien]

	useEffect(() => {
		if (props.position > -1) {
			let col = currentColorCtx.cubeState[center][props.position]
			setColor(cssFaceColors[col])
		}
	}, [currentColorCtx.cubeState])

	const handlePicker = (event: MouseEvent<HTMLButtonElement>) => {
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
			<button disabled={props.disabled} style={{ background: color }} className="cubie-face" onClick={handlePicker} />
			<Menu id="color_picker" anchorEl={anchor_colorPicker} open={Boolean(anchor_colorPicker)} onClose={handleClose}>
				{Object.values(cssFaceColors).map((x) => (
					<MenuItem key={"face_" + x} style={{ width: 80, height: 40, background: x }} onClick={() => handleColor(x)} />
				))}
			</Menu>
		</div>
	)
}

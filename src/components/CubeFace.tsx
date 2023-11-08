import React, { FC, useContext } from "react"
import { CubieFace } from "./CubieFace"
import { RotationBar } from "./RotationBar"
import { TRubiksCubeOrientation, cubeOrientationAndColors } from "../model/RubiksCube"
import { ContextHub } from "./AllFaces"
import { cssFaceColors } from "../util/utilities"
import { TRotationDirection } from "../model/Cubie"
import { cube } from "../util/constants"

export const CubeFace: FC<{ faceOrien: TRubiksCubeOrientation }> = (props) => {
	const curCenterColor = cubeOrientationAndColors[props.faceOrien]
	const allFaces = useContext(ContextHub).facesContext
	const cssColors = allFaces.cubeState[curCenterColor].map((x) => cssFaceColors[x])

	return (
		<div className="cube-face">
			{/* <RotationBar
                clickLeft={() => {
                    cube.rotate(props.faceOrien + "'" as TRotationDirection)
                    allFaces.updateCubeState()
                }}
                clickRight={() => {
                    cube.rotate(props.faceOrien)
                    allFaces.updateCubeState()
                }}
            /> */}

			<div className="face-container">
				{[0, 1, 2, 3].map((x) => (
					<div className="face-item" key={"face_" + x}>
						<CubieFace initialColor={cssColors[x]} orien={props.faceOrien} position={x} />
					</div>
				))}
				<div className="face-item">
					<CubieFace initialColor={cssFaceColors[curCenterColor]} disabled orien={props.faceOrien} position={-1} />
				</div>
				{[4, 5, 6, 7].map((x) => (
					<div className="face-item" key={"face_" + x}>
						<CubieFace initialColor={cssColors[x]} orien={props.faceOrien} position={x} />
					</div>
				))}
			</div>
		</div>
	)
}

export const EmptyFace: FC = () => <div />

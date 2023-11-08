import React, { FC, useContext, useEffect, useState } from "react"
import { ContextHub } from "./AllFaces"
import { cube } from "../util/constants"

export const StepPanel: FC<{ text: string; index: number }> = (props) => {
	const index = props.index
	const stepsCtx = useContext(ContextHub).stepsContext
	const facesCtx = useContext(ContextHub).facesContext
	const stepsArr = stepsCtx.steps.Phase1.concat(stepsCtx.steps.Phase2)
	const [style, setStyle] = useState("step-up")

	useEffect(() => {
		if (index <= stepsCtx.currentStepIndex) {
			setStyle("step-down")
		} else {
			setStyle("step-up")
		}
	}, [stepsCtx.currentStepIndex])

	return (
		<button
			className={style}
			onClick={() => {
				stepsCtx.restoreInitial()
				stepsCtx.updateCurrentIndex(index)
				for (let u = 0; u <= index; u++) {
					cube.rotate(stepsArr[u])
				}
				facesCtx.updateCubeState()
			}}
		>
			{props.text + "_" + index.toString()}
		</button>
	)
}

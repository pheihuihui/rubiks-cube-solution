import React, { useState, useContext, useEffect, FC } from "react"
import { ContextHub } from "./AllFaces"
import { StepPanel } from "./StepPanel"
import { PlayButton } from "./Buttons"
import { TRotationDirection } from "../model/Cubie"

export const SolutionPanel: FC = () => {
	const stpCtx = useContext(ContextHub).stepsContext
	const [steps, setSteps] = useState(stpCtx.steps)

	useEffect(() => {
		setSteps(stpCtx.steps)
	}, [stpCtx.steps])

	return (
		<div className="sol-root">
			<PlayButton />
			<div className="sol-inner">
				<div className="sol-line">
					<div className="sol-text">{"G0 -> G1:   "}</div>
					{[steps.Phase0 as TRotationDirection, ...steps.Phase1].map((v, i) => (
						<StepPanel text={v as string} index={i - 1} key={"key_" + i.toString()} />
					))}
				</div>
				<div className="sol-line">
					<div className="sol-text">{"G1 -> G2:   "}</div>
					{[...steps.Phase2, steps.Phase3 as TRotationDirection].map((v, i) => (
						<StepPanel text={v as string} index={i + steps.Phase1.length} key={"key_" + i.toString()} />
					))}
				</div>
			</div>
		</div>
	)
}

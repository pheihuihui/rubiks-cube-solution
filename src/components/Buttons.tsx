import React, { useContext, useState, useEffect, FC } from "react"
import { deserializeCube, scrambleCube } from "../solution/utils"
import { ContextHub } from "./AllFaces"
import { isSolvable } from "../solution/validate"
import { cube, currentPlaneView } from "../util/constants"
import { TMessageEventArgs } from "../worker"
import { CheckIcon, IdeaIcon, PlayIcon, RestoreIcon, ShuffleIcon } from "./Icons"
import { CircularIndeterminate } from "./CircularIndeterminate"

export const RestoreButton: FC = () => {
	const allFaces = useContext(ContextHub).facesContext

	return (
		<div className="buttons-out">
			<button
				className="button-item"
				onClick={() => {
					cube.restore()
					allFaces.updateCubeState()
				}}
			>
				<RestoreIcon />
			</button>
		</div>
	)
}

export const ShuffleButton: FC = () => {
	const allFaces = useContext(ContextHub).facesContext

	return (
		<div className="buttons-out">
			<button
				className="button-item"
				onClick={() => {
					scrambleCube()
					allFaces.updateCubeState()
				}}
			>
				<ShuffleIcon />
			</button>
		</div>
	)
}

export const SolutionButton: FC = () => {
	const stpCtx = useContext(ContextHub).stepsContext
	const cptCtx = useContext(ContextHub).computingContext

	return (
		<div className="buttons-out">
			<button
				className="button-item"
				onClick={() => {
					cptCtx.updateComputingState(true)
					let wk = new Worker("worker.js")
					wk.onmessage = function (e: MessageEvent<TMessageEventArgs<"solution">>) {
						if (e.data?.messageType == "solution") {
							console.log(e.data.content)
							stpCtx.updateSteps(e.data.content)
							cptCtx.updateComputingState(false)
							wk.terminate()
						}
					}
					let dcube = deserializeCube(cube)
					let msg: TMessageEventArgs<"cube"> = { messageType: "cube", content: dcube }
					wk.postMessage(msg)
				}}
			>
				{cptCtx.isComputing ? <CircularIndeterminate /> : <IdeaIcon />}
			</button>
		</div>
	)
}

export const ValidateButton: FC = () => {
	return (
		<div className="buttons-out">
			<button
				className="buttons-item"
				onClick={() => {
					let pln = currentPlaneView.getCurrent()
					cube.restore(pln)
					let solvable = isSolvable(pln)
					console.log(solvable)
				}}
			>
				<CheckIcon />
			</button>
		</div>
	)
}

export const TestButton: FC = () => {
	const comCtx = useContext(ContextHub).computingContext

	return (
		<div className="buttons-out">
			<button
				className="buttons-item"
				onClick={() => {
					comCtx.updateComputingState(!comCtx.isComputing)
				}}
			>
				<CheckIcon />
			</button>
		</div>
	)
}

export const PlayButton: FC = () => {
	const stepsCtx = useContext(ContextHub).stepsContext
	const facesCtx = useContext(ContextHub).facesContext
	const [steps, setSteps] = useState([...stepsCtx.steps.Phase1, ...stepsCtx.steps.Phase2])
	useEffect(() => {
		setSteps([...stepsCtx.steps.Phase1, ...stepsCtx.steps.Phase2])
	}, [stepsCtx.steps])

	return (
		<button
			className="button-button"
			onClick={() => {
				steps.forEach((v, i) => {
					setTimeout(() => {
						cube.rotate(v)
						facesCtx.updateCubeState()
					}, i * 1500)
				})
			}}
		>
			<PlayIcon />
		</button>
	)
}

export const bt = <ValidateButton />

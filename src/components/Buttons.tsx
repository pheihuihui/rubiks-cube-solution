import React, { useContext, useState, useEffect, FunctionComponent } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { deserializeCube, scrambleCube } from "../solution/Solution";
import { ContextHub } from "./AllFaces";
import { isSolvable } from "../solution/Validation";
import { cube, currentPlaneView } from "../util/constants";
import { TMessageEventArgs } from "../worker";
import { CheckIcon, IdeaIcon, PlayIcon, RestoreIcon, ShuffleIcon } from "./Icons";

export const RestoreButton: FunctionComponent = () => {

    const allFaces = useContext(ContextHub).facesContext

    return (
        <div className="button-out" >
            <Tooltip title="restore" aria-label="RestoreLable">
                <IconButton className="button-item" onClick={
                    () => {
                        cube.restore()
                        allFaces.updateCubeState()
                    }}>
                    <RestoreIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export const ShuffleButton: FunctionComponent = () => {

    const allFaces = useContext(ContextHub).facesContext

    return (
        <div className="button-out" >
            <Tooltip title="scramble" aria-label="ScrambleLable">
                <IconButton className="button-item" onClick={
                    () => {
                        scrambleCube()
                        allFaces.updateCubeState()
                    }}>
                    <ShuffleIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export const SolutionButton: FunctionComponent = () => {

    const stpCtx = useContext(ContextHub).stepsContext
    const cptCtx = useContext(ContextHub).computingContext

    return (
        <div className="button-out" >
            <Tooltip title="solve">
                <IconButton className="button-item" onClick={
                    () => {
                        cptCtx.updateComputingState(true)
                        let wk = new Worker('worker.js')
                        wk.onmessage = function (e: MessageEvent<TMessageEventArgs<'solution'>>) {
                            if (e.data?.messageType == 'solution') {
                                console.log(e.data.content)
                                stpCtx.updateSteps(e.data.content)
                                cptCtx.updateComputingState(false)
                                wk.terminate()
                            }
                        }
                        let dcube = deserializeCube(cube)
                        let msg: TMessageEventArgs<'cube'> = { messageType: 'cube', content: dcube }
                        wk.postMessage(msg)
                    }}>
                    <IdeaIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export const ValidateButton: FunctionComponent = () => {

    return (
        <div className="button-out" >
            <Tooltip title="validate">
                <IconButton className="button-item" onClick={() => {
                    let pln = currentPlaneView.getCurrent()
                    cube.restore(pln)
                    let solvable = isSolvable(pln)
                    console.log(solvable)
                }}>
                    <CheckIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export const TestButton: FunctionComponent = () => {

    const comCtx = useContext(ContextHub).computingContext

    return (
        <div className="button-out" >
            <Tooltip title="test">
                <IconButton className="button-item" onClick={
                    () => {
                        comCtx.updateComputingState(!comCtx.isComputing)
                    }}>
                    <CheckIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export const PlayButton: FunctionComponent = () => {

    const stepsCtx = useContext(ContextHub).stepsContext
    const facesCtx = useContext(ContextHub).facesContext
    const [steps, setSteps] = useState([...stepsCtx.steps.Phase1, ...stepsCtx.steps.Phase2])
    useEffect(() => {
        setSteps([...stepsCtx.steps.Phase1, ...stepsCtx.steps.Phase2])
    }, [stepsCtx.steps])

    return (
        <IconButton className="button-button" onClick={() => {
            steps.forEach((v, i) => {
                setTimeout(() => {
                    cube.rotate(v)
                    facesCtx.updateCubeState()
                }, i * 1500)
            })
        }}>
            <PlayIcon />
        </IconButton>
    )
}


import { makeStyles } from "@material-ui/core/styles";
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RestoreIcon from '@material-ui/icons/Restore';
import FlareIcon from '@material-ui/icons/Flare';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React, { useContext, useState, useEffect } from "react";
import { IconButton, Tooltip, Fab } from "@material-ui/core";
import { scrambleCube, decomposeSteps } from "../solution/Solution";
import { ContextHub } from "./AllFaces";
import { cube } from '..'
import { getSolution } from "../solution/tmp";
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

const useStyle = makeStyles({
    out: {
        width: 125,
        height: 125,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        boxShadow: '6px 6px 19px #225451, -6px -6px 19px #44aca5'
    },
    buttonStyle: {
        width: 100,
        height: 100,
        boxShadow: '6px 6px 19px #225451, -6px -6px 19px #44aca5'
    },
    iconStyle: {
        width: 70,
        height: 70
    }
})

export const RestoreButton = () => {
    const allFaces = useContext(ContextHub).facesContext
    const bclass = useStyle()
    return (
        <div className={bclass.out} >
            <Tooltip title="restore" aria-label="RestoreLable">
                <IconButton className={bclass.item} onClick={
                    () => {
                        cube.restore()
                        allFaces.updateCubeState()
                    }}>
                    <RestoreIcon fontSize={'large'} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export const ShuffleButton = () => {
    const allFaces = useContext(ContextHub).facesContext
    const bclass = useStyle()
    return (
        <div className={bclass.out} >
            <Tooltip title="scramble" aria-label="ScrambleLable">
                <IconButton className={bclass.item} onClick={
                    () => {
                        scrambleCube()
                        allFaces.updateCubeState()
                    }}>
                    <ShuffleIcon fontSize={'large'} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export const SolutionButton = () => {
    const bclass = useStyle()
    const stpCtx = useContext(ContextHub).stepsContext
    return (
        <div className={bclass.out} >
            <Tooltip title="solve">
                <IconButton className={bclass.item} onClick={
                    () => {
                        let stp = getSolution(cube)
                        stpCtx.updateSteps(stp)
                        console.log(stpCtx.totalSteps)
                    }}>
                    <FlareIcon fontSize={'large'} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export const ValidateButton = () => {
    const bclass = useStyle()
    return (
        <div className={bclass.out} >
            <Tooltip title="validate">
                <IconButton className={bclass.item}>
                    <CheckCircleIcon fontSize={'large'} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export const PlayButton = () => {
    const pstyle = useStyle()
    const stepsCtx = useContext(ContextHub).stepsContext
    const facesCtx = useContext(ContextHub).facesContext
    const [steps, setSteps] = useState([...stepsCtx.steps.Phase1, ...stepsCtx.steps.Phase2])
    useEffect(() => {
        setSteps([...stepsCtx.steps.Phase1, ...stepsCtx.steps.Phase2])
    }, [stepsCtx.steps])
    return (
        <IconButton className={pstyle.buttonStyle} onClick={() => {
            steps.forEach((v, i) => {
                setTimeout(() => {
                    cube.rotate(v)
                    facesCtx.updateCubeState()
                }, i * 1500)
            })
        }}>
            <PlayArrowIcon className={pstyle.iconStyle} />
        </IconButton>
    )
}

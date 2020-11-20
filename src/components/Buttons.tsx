import { makeStyles } from "@material-ui/core/styles";
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RestoreIcon from '@material-ui/icons/Restore';
import FlareIcon from '@material-ui/icons/Flare';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React, { useContext, useState, useEffect } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { scrambleCube } from "../solution/Solution";
import { ContextHub } from "./AllFaces";
import { cube } from '..'
import { getSolution } from "../solution/tmp";
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { useWindowScale } from "../util/hooks";

const useStyle = makeStyles<Theme, { scale: number }>({
    out: props => ({
        width: 125 * props.scale,
        height: 125 * props.scale,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }),
    item: props => ({
        boxShadow: '6px 6px 19px #225451, -6px -6px 19px #44aca5',
        width: 60 * props.scale + 10,
        height: 60 * props.scale + 10
    }),
    buttonStyle: props => ({
        width: 100 * props.scale,
        height: 100 * props.scale,
        boxShadow: '6px 6px 19px #225451, -6px -6px 19px #44aca5'
    }),
    iconStyle: props => ({
        width: 70 * props.scale,
        height: 70 * props.scale
    })
})

export const RestoreButton = () => {
    const sc = useWindowScale()
    const allFaces = useContext(ContextHub).facesContext
    const bclass = useStyle({ scale: sc })
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
    const sc = useWindowScale()
    const allFaces = useContext(ContextHub).facesContext
    const bclass = useStyle({ scale: sc })
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
    const sc = useWindowScale()
    const bclass = useStyle({ scale: sc })
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
    const sc = useWindowScale()
    const bclass = useStyle({ scale: sc })
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
    const sc = useWindowScale()
    const pstyle = useStyle({ scale: sc })
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

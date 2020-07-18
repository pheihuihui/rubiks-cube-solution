import { makeStyles } from "@material-ui/core/styles";
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RestoreIcon from '@material-ui/icons/Restore';
import FlareIcon from '@material-ui/icons/Flare';
import React, { useContext } from "react";
import { IconButton, Tooltip, Fab } from "@material-ui/core";
import { scrambleCube } from "../solution/Solution";
import { ContextHub } from "./AllFaces";
import { cube } from '..'
import { getSolution } from "../solution/tmp";

const useStyle = makeStyles({
    out: {
        width: 250,
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export const RestoreButton = () => {
    const allFaces = useContext(ContextHub).facesContext
    const bclass = useStyle()
    return (
        <div className={bclass.out} >
            <Tooltip title="restore" aria-label="RestoreLable">
                <IconButton onClick={
                    () => {
                        cube.restore()
                        allFaces.updateCubeState(cube.getAllFaces())
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
                <IconButton onClick={
                    () => {
                        scrambleCube()
                        allFaces.updateCubeState(cube.getAllFaces())
                    }}>
                    <ShuffleIcon fontSize={'large'} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export const SolutionButton = () => {
    const bclass = useStyle()
    const solCtx = useContext(ContextHub).solutionContext
    return (
        <div className={bclass.out} >
            <Tooltip title="solve">
                <IconButton onClick={
                    () => {
                        let sol = getSolution(cube)
                        solCtx.updateSolution(sol)
                    }}>
                    <FlareIcon fontSize={'large'} />
                </IconButton>
            </Tooltip>
        </div>
    )
}
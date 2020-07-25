import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import PauseIcon from '@material-ui/icons/Pause';
import { IconButton, makeStyles } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { ContextHub } from './AllFaces';
import { cube } from '..';
import { TRotationDirection } from '../model/RubiksCube';
import { getReversedDirection } from '../solution/Solution';

const useStyle = makeStyles({
    root: {
        height: '30px',
        width: '240px',
        display: 'flex',
        justifyContent: 'center',
        background: 'silver',
        position: 'relative',
        bottom: '-15px',
        borderRadius: 20,
        border: '1px solid black'
    }
})

export const PlayerBar = () => {

    const stepsCtx = useContext(ContextHub).stepsContext
    const facesCtx = useContext(ContextHub).facesContext
    const [paused, setPaused] = useState(false)
    const stl = useStyle()

    return (
        <div className={stl.root}>
            <IconButton style={{ color: 'black' }} onClick={() => {
                stepsCtx.restoreInitial()
                facesCtx.updateCubeState()
            }}>
                <SettingsBackupRestoreIcon />
            </IconButton>
            <IconButton style={{ color: 'black' }} onClick={() => {
                stepsCtx.stepBackward()
                let rev = getReversedDirection(stepsCtx.currentStep) as TRotationDirection
                console.log(rev)
                cube.rotate(rev)

                facesCtx.updateCubeState()
            }}>
                <SkipPreviousIcon />
            </IconButton>

            <IconButton style={{ color: 'black' }} onClick={() => {
                stepsCtx.steps.forEach((v, i) => {
                    setTimeout(() => {
                        if (!paused) {
                            cube.rotate(v as TRotationDirection)
                            facesCtx.updateCubeState()
                        }
                        setPaused(false)
                    }, i * 1000)
                })
            }}>
                <PlayArrowIcon />
            </IconButton>

            <IconButton style={{ color: 'black' }} onClick={() => {
                setPaused(true)
            }}>
                <PauseIcon />
            </IconButton>

            <IconButton style={{ color: 'black' }} onClick={() => {
                console.log(stepsCtx.currentStep)
                cube.rotate(stepsCtx.currentStep as TRotationDirection)
                stepsCtx.stepForward()
                facesCtx.updateCubeState()
            }}>
                <SkipNextIcon />
            </IconButton>
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { ContextHub } from './AllFaces';
import { cube } from '..';

const useStyle = makeStyles({
    up: {
        width: 60,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'grey'
    },
    down: {
        width: 60,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'blue'
    }
})

export const StepPanel = (props: { text: string, index: number }) => {
    const sUp = useStyle().up
    const sDown = useStyle().down
    const index = props.index
    const stepsCtx = useContext(ContextHub).stepsContext
    const facesCtx = useContext(ContextHub).facesContext
    const stepsArr = stepsCtx.steps.Phase1.concat(stepsCtx.steps.Phase2)
    const [style, setStyle] = useState(sUp)

    useEffect(() => {
        if (index <= stepsCtx.currentStepIndex) {
            setStyle(sDown)
        } else {
            setStyle(sUp)
        }
        console.log(stepsCtx.currentStepIndex)
    }, [stepsCtx.currentStepIndex])

    return (
        <button className={style} onClick={() => {
            stepsCtx.restoreInitial()
            stepsCtx.updateCurrentIndex(index)
            for (let u = 0; u <= index; u++) {
                cube.rotate(stepsArr[u])
            }
            facesCtx.updateCubeState()
        }}>{props.text + '_' + index.toString()}</button>
    );
};

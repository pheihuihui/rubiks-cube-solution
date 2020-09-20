import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { ContextHub } from './AllFaces';
import { cube, globalColors } from '..';
import { useWindowScale } from '../util/hooks';

const useStyle = makeStyles<Theme, { scale: number }>({
    up: props => ({
        width: 50 * props.scale,
        height: 30 * props.scale,
        borderRadius: 8,
        backgroundColor: globalColors.documentBodyBackgroudColor.toString(),
        margin: 5,
        border: 0,
        boxShadow: '4px 4px 8px #143331, -4px -4px 8px #52cdc5'
    }),
    down: props => ({
        width: 50 * props.scale,
        height: 30 * props.scale,
        borderRadius: 8 * props.scale,
        backgroundColor: globalColors.documentBodyBackgroudColor.toString(),
        margin: 5,
        border: 0,
        boxShadow: 'inset 4px 4px 8px #143331, inset -4px -4px 8px #52cdc5'
    })
})

export const StepPanel = (props: { text: string, index: number }) => {
    const sc = useWindowScale()
    const sUp = useStyle({ scale: sc }).up
    const sDown = useStyle({ scale: sc }).down
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

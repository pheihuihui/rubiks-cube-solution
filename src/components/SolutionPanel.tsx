import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useState, useContext, useEffect } from "react";
import { PlayerBar } from "./PlayerBar";
import { ContextHub } from "./AllFaces";
import { decomposeSteps } from "../solution/Solution";
import { Paper } from "@material-ui/core";
import { StepPanel } from "./StepPanel";
import { NeumorphicStepPanel } from "./NeumorphicStepPanel";

const useStyle = makeStyles({
    root: {
        width: 1000,
        height: 100,
        background: 'silver',
        borderRadius: 20,
        display: 'flex',
        flexWrap: 'wrap',
        border: '2px solid black',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    out: {
        width: 1000,
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export const SolutionPanel = () => {
    //const solCtx = useContext(ContextHub).solutionContext
    const stpCtx = useContext(ContextHub).stepsContext
    const [steps, setSteps] = useState(stpCtx.steps)
    const sclass = useStyle()

    useEffect(() => {
        setSteps(stpCtx.steps)
    }, [stpCtx.steps])

    return (
        <div className={sclass.out} >
            <PlayerBar />
            <div className={sclass.root}>
                {
                    //steps.map((v, i) => <StepPanel key={"key_" + i.toString()} text={v} />)
                    steps.map((v, i) => <NeumorphicStepPanel text={v} key={"key_" + i.toString()} />)
                }
            </div>
        </div>
    )
}

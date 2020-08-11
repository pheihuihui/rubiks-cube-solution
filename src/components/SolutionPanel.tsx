import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useState, useContext, useEffect } from "react";
import { ContextHub } from "./AllFaces";
import { StepPanel } from "./StepPanel";
import { PlayButton } from "./Buttons";
import { testSolution } from "../solution/Solution";
import { TRotationDirection } from "../model/RubiksCube";

const useStyle = makeStyles({
    root: {
        width: 1400,
        height: 220,
        display: 'flex',
        alignItems: 'center'
    },
    inner: {
        height: 200,
        display: 'flex',
        alignItems: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    line: {
        width: 1200,
        height: 100,
        display: 'flex',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Georgia'
    }
})

export const SolutionPanel = () => {
    const stpCtx = useContext(ContextHub).stepsContext
    const [steps, setSteps] = useState(stpCtx.steps)
    const sclass = useStyle()

    useEffect(() => {
        setSteps(stpCtx.steps)
        console.log(stpCtx.steps)
    }, [stpCtx.steps])

    return (
        <div className={sclass.root} >
            <PlayButton />
            <div className={sclass.inner}>
                <div className={sclass.line}>
                    <div className={sclass.text}>{"G0 -> G1:   "}</div>
                    {
                        [steps.Phase0 as TRotationDirection, ...steps.Phase1].map((v, i) =>
                            <StepPanel text={v as string} index={i - 1} key={"key_" + i.toString()} />
                        )
                    }
                </div>
                <div className={sclass.line}>
                    <div className={sclass.text}>{"G1 -> G2:   "}</div>
                    {
                        [...steps.Phase2, steps.Phase3 as TRotationDirection].map((v, i) =>
                            <StepPanel text={v as string} index={i + steps.Phase1.length} key={"key_" + i.toString()} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

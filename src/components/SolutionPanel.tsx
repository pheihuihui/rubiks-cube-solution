import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useState, useContext, useEffect } from "react";
import { ContextHub } from "./AllFaces";
import { StepPanel } from "./StepPanel";
import { PlayButton } from "./Buttons";
import { TRotationDirection } from "../model/RubiksCube";
import { Theme } from "@material-ui/core";
import { useWindowScale } from "../util/hooks";

const useStyle = makeStyles<Theme, { scale: number }>({
    root: props => ({
        width: 1400 * props.scale,
        height: 220 * props.scale,
        display: 'flex',
        alignItems: 'center'
    }),
    inner: props => ({
        height: 200 * props.scale,
        display: 'flex',
        alignItems: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }),
    line: props => ({
        width: 1200 * props.scale,
        height: 100 * props.scale,
        display: 'flex',
        alignItems: 'center'
    }),
    text: {
        fontFamily: 'Georgia'
    }
})

export const SolutionPanel = () => {
    const sc = useWindowScale()
    const stpCtx = useContext(ContextHub).stepsContext
    const [steps, setSteps] = useState(stpCtx.steps)
    const sclass = useStyle({ scale: sc })

    useEffect(() => {
        setSteps(stpCtx.steps)
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

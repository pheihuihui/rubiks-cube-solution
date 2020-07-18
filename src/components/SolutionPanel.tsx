import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useState, useContext, useEffect } from "react";
import { PlayerBar } from "./PlayerBar";
import { ContextHub } from "./AllFaces";
import { decomposeSteps } from "../solution/Solution";
import { Paper } from "@material-ui/core";

const useStyle = makeStyles({
    root: {
        width: 700,
        height: 200,
        background: 'silver',
        borderRadius: 20,
        display: 'flex',
        flexWrap: 'wrap',
        border: '2px solid black'
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
    const solCtx = useContext(ContextHub).solutionContext
    const [text, setText] = useState("")
    const sclass = useStyle()

    useEffect(() => {
        setText(solCtx.solution)
    }, [solCtx])

    return (
        <div className={sclass.out} >
            <PlayerBar />
            <div className={sclass.root}>
                {
                    decomposeSteps(text).map(x => <Paper square >{x}</Paper>)
                }
            </div>
        </div>
    )
}

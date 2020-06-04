import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { PlayerBar } from "./PlayerBar";

const useStyle = makeStyles({
    root: {
        width: 700,
        height: 200,
        background: 'silver',
        borderRadius: 20,
        display: 'flex',
        flexWrap: 'wrap',
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
    const bclass = useStyle()
    return (
        <div className={bclass.out} >
            <PlayerBar />
            <div className={bclass.root} style={{ border: '2px solid black' }}>
            </div>
        </div>
    )
}

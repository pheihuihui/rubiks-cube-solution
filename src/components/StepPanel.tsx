import { Paper, makeStyles, Theme, createStyles, Button, IconButton } from "@material-ui/core"
import React, { useState, useContext } from "react"
import { cube } from ".."
import { TRotationDirection } from "../model/RubiksCube"
import { ContextHub } from "./AllFaces"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(16),
                height: theme.spacing(16),
            }
        },
        smallButton: {
            width: 32,
            height: 32,
            background: '#d9e6e8'
        },
        bigButton: {
            width: 32,
            height: 32,
            background: '#48b4c5'
        }
    })
)

export const StepPanel = (props: { text: string }) => {
    const pclass = useStyles()
    const [buttonClass, setButtonClass] = useState(pclass.smallButton)
    const facesContext = useContext(ContextHub).facesContext
    return (
        <div className={pclass.root}>
            {/* <Paper elevation={3} variant="outlined" square > */}
            <IconButton className={buttonClass} color="primary" onClick={() => {
                // if (buttonClass == pclass.bigButton) {
                //     setButtonClass(pclass.smallButton)
                // } else {
                //     setButtonClass(pclass.bigButton)
                // }
                cube.rotate(props.text as TRotationDirection)
                facesContext.updateCubeState()
            }}>
                {props.text.slice(0, 2)}
            </IconButton>
            {/* </Paper> */}
        </div>
    )
}
import { Paper, makeStyles, Theme, createStyles, Button, IconButton } from "@material-ui/core"
import React, { useState } from "react"

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
            width: 64,
            height: 64,
            background: '#d9e6e8'
        },
        bigButton: {
            width: 96,
            height: 96,
            background: '#d9e6e8'
        }
    })
)

export const StepPanel = (props: { text: string }) => {
    const pclass = useStyles()
    const [buttonClass, setButtonClass] = useState(pclass.smallButton)
    return (
        <div className={pclass.root}>
            {/* <Paper elevation={3} variant="outlined" square > */}
            <IconButton className={buttonClass} color="primary" onClick={() => {
                if (buttonClass == pclass.bigButton) {
                    setButtonClass(pclass.smallButton)
                } else {
                    setButtonClass(pclass.bigButton)
                }
            }}>
                {props.text}
            </IconButton>
            {/* </Paper> */}
        </div>
    )
}
export const st = <StepPanel text="hi" />
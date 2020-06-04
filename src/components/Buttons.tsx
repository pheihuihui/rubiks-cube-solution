import { makeStyles } from "@material-ui/core/styles";
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RestoreIcon from '@material-ui/icons/Restore';
import FlareIcon from '@material-ui/icons/Flare';
import React from "react";
import { IconButton } from "@material-ui/core";

const useStyle = makeStyles({
    out: {
        width: 250,
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export const RestoreButton = () => {
    const bclass = useStyle()
    return (
        <div className={bclass.out} >
            <IconButton>
                <RestoreIcon fontSize={'large'} />
            </IconButton>
        </div>
    )
}

export const ShuffleButton = () => {
    const bclass = useStyle()
    return (
        <div className={bclass.out} >
            <IconButton>
                <ShuffleIcon fontSize={'large'} />
            </IconButton>
        </div>
    )
}

export const SolutionButton = () => {
    const bclass = useStyle()
    return (
        <div className={bclass.out} >
            <IconButton>
                <FlareIcon fontSize={'large'} />
            </IconButton>
        </div>
    )
}
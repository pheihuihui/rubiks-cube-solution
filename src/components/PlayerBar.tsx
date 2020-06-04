import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import PauseIcon from '@material-ui/icons/Pause';
import { IconButton, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles({
    root: {
        height: '30px',
        width: '240px',
        display: 'flex',
        justifyContent: 'center',
        background: 'silver',
        position: 'relative',
        bottom: '-15px',
        borderRadius: 20,
        border: '1px solid black'
    }
})

export const PlayerBar = () => {

    const stl = useStyle()

    return (
        <div className={stl.root}>
            <IconButton style={{ color: 'black' }} onClick={() => { }}><SettingsBackupRestoreIcon /></IconButton>
            <IconButton style={{ color: 'black' }} onClick={() => { }}><SkipPreviousIcon /></IconButton>
            <IconButton style={{ color: 'black' }} onClick={() => { }}><PlayArrowIcon /></IconButton>
            <IconButton style={{ color: 'black' }} onClick={() => { }}><PauseIcon /></IconButton>
            <IconButton style={{ color: 'black' }} onClick={() => { }}><SkipNextIcon /></IconButton>
        </div>
    )
}

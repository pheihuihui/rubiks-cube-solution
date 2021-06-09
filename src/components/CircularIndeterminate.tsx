import React, { FunctionComponent, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useWindowScale } from '../util/hooks';
import { ContextHub } from './AllFaces';
import { createStyles } from '@material-ui/core';

const useStyle = makeStyles<Theme, {}, 'div'>(_ =>
    createStyles({
        div: {
            zIndex: 10,
            height: 10
        }
    })
);

export const CircularIndeterminate: FunctionComponent = () => {
    const style = useStyle()
    const sc = useWindowScale()
    const isComputing = useContext(ContextHub).computingContext

    return (
        <div className={style.div}>
            <CircularProgress style={{ height: sc * 300, width: sc * 300 }} />
        </div>
    )
}

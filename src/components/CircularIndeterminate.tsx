import React, { FunctionComponent, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useWindowScale } from '../util/hooks';
import { ContextHub } from './AllFaces';

export const CircularIndeterminate: FunctionComponent = () => {

    const sc = useWindowScale()
    const isComputing = useContext(ContextHub).computingContext

    return (
        <div className="circular-indeterminate">
            <CircularProgress style={{ height: sc * 300, width: sc * 300 }} />
        </div>
    )
}

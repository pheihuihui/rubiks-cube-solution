import React, { FC, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ContextHub } from './AllFaces';

export const CircularIndeterminate: FC = () => {

    const isComputing = useContext(ContextHub).computingContext

    return (
        <div className="circular-indeterminate">
            <CircularProgress style={{ height: 100, width: 100 }} />
        </div>
    )
}

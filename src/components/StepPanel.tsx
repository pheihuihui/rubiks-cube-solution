import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    up: {

    },
    down: {

    }
})

export const StepPanel = (props: { text: string }) => {
    return (
        <button>{props.text}</button>
    );
};

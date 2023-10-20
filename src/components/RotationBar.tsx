import React, { FC } from 'react'
import { RotateLeftIcon, RotateRightIcon } from './Icons'

export const RotationBar: FC<{ clickLeft: () => void, clickRight: () => void }> = props => {
    return (
        <div className="bar-root">
            <button className="bar-button-item-l" style={{ color: 'black' }} onClick={() => props.clickLeft()}><RotateLeftIcon /></button>
            <button className="bar-button-item-r" style={{ color: 'black' }} onClick={() => props.clickRight()}><RotateRightIcon /></button>
        </div>
    )
}

export const bar = <RotationBar clickLeft={() => { }} clickRight={() => { }} />
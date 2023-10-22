import React, { FC } from 'react';

export const CircularIndeterminate: FC = () =>
    <div className="circular-indeterminate">
        <span>
            <svg viewBox="22 22 44 44">
                <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
            </svg>
        </span>
    </div>

export const ci = <CircularIndeterminate />
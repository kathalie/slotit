import React from 'react';

export type ArrowDirection = { className: string };

export const directions: Record<string, ArrowDirection> = {
    toLeft: {className: "toLeft"},
    toRight: {className: "toRight"}
}

const AngleArrow = ({direction}: {
    direction: ArrowDirection
}) => {
    return (
        <span className={`AngleArrow ${direction.className}`}>

        </span>
    );
};

export default AngleArrow;

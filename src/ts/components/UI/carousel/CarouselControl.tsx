import React from 'react';
import {Callback} from "../../../types/callback.type";

export enum CarouselControlDirection {
    Left, Right
}

type DirectionProps = {
    direction: CarouselControlDirection;
    caption: string;
    calcIndex: (index: number) => number;
    className: string;
}

const directions: DirectionProps[] = [
    {direction: CarouselControlDirection.Left, caption: "\u2039", calcIndex: (index: number) => index - 1, className: "left-control"},
    {direction: CarouselControlDirection.Right, caption: "\u203A", calcIndex: (index: number) => index + 1, className: "right-control"}
];

const CarouselControl = ({direction, index, updateIndex}: {
    direction: CarouselControlDirection,
    index: number,
    updateIndex: Callback
}) => {
    const directionProps = directions.find(d => d.direction === direction) as DirectionProps;

    return (
        <button className={`CarouselControl ${directionProps.className}`}
                onClick={() => updateIndex(directionProps.calcIndex(index))}
        >
            {directionProps.caption}
        </button>
    );
};

export default CarouselControl;

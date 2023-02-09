import React from 'react';
import {Callback} from "../../../types/basic.types";

export enum CarouselControlDirection {
    Left, Right
}

type ArrowButtonProps = {
    direction: CarouselControlDirection;
    caption: JSX.Element | string;
    calcIndex: (index: number) => number;
    className: string;
}

const controlsDirections: ArrowButtonProps[] = [
    // {direction: CarouselControlDirection.Left, caption: <AngleArrow direction={directions.toLeft}/>, calcIndex: (index: number) => index - 1, className: "left-control"},
    // {direction: CarouselControlDirection.Right, caption: <AngleArrow direction={directions.toRighty}/>, calcIndex: (index: number) => index + 1, className: "right-control"}
    {direction: CarouselControlDirection.Left, caption: "\u2039", calcIndex: (index: number) => index - 1, className: "left-control"},
    {direction: CarouselControlDirection.Right, caption: "\u203A", calcIndex: (index: number) => index + 1, className: "right-control"}
];

const CarouselControl = ({direction, index, updateIndex}: {
    direction: CarouselControlDirection,
    index: number,
    updateIndex: Callback
}) => {
    const arrowButtonProps = controlsDirections.find(d => d.direction === direction) as ArrowButtonProps;

    return (
        <button className={`CarouselControl ${arrowButtonProps.className}`}
                onClick={() => updateIndex(arrowButtonProps.calcIndex(index))}
        >
            {arrowButtonProps.caption}
        </button>
    );
};

export default CarouselControl;

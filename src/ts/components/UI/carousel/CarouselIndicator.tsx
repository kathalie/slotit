import React from 'react';
import {Callback} from "../../../types/basic.types";

const CarouselIndicator = ({defaultIndex, setIndex, className}: {
    defaultIndex: number,
    setIndex: Callback,
    className: string
}) => {
    return (
        <button className={`CarouselIndicator ${className}`} onClick={() => setIndex(defaultIndex)}>

        </button>
    );
};

export default CarouselIndicator;

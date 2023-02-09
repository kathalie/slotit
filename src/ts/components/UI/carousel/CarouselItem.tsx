import React from 'react';
import {JSXChildren} from "../../../types/basic.types";

const CarouselItem = ({children, width, className}: {
    children: JSXChildren,
    width: string | number,
    className: string
}) => {

    return (
        <div className={`CarouselItem ${className ?? ""}`} style={{width}}>
            {children}
        </div>
    );
};

export default CarouselItem;

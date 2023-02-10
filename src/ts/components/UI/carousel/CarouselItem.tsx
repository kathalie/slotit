import React from 'react';
import {JSXChildren} from "../../../types/basic.types";
import {concatClassNames} from "../../../utils/concatClassNames";

const CarouselItem = ({children, width, className}: {
    children: JSXChildren,
    width: string | number,
    className: string
}) => {

    return (
        <div className={concatClassNames("CarouselItem", className)} style={{width}}>
            {children}
        </div>
    );
};

export default CarouselItem;

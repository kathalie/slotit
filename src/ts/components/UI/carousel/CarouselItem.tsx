import React from 'react';

const CarouselItem = ({children, width, className}: {
    children: JSX.Element[] | JSX.Element,
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

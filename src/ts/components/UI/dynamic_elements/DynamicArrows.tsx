import React from 'react';
import AngleArrow, {ArrowDirection} from "../AngleArrow";

const DynamicArrows = ({direction}: {
    direction: ArrowDirection
}) => {

    return (
        <div className={`DynamicArrows ${direction.className}`}>
            {
                Array(3)
                    .fill(true)
                    .map((_, i) => <AngleArrow direction={direction} key={i} />)
            }
        </div>
    );
};

export default DynamicArrows;

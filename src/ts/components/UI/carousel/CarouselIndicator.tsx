import React from 'react';
import {Callback} from "../../../types/callback.type";

const DotButton = ({defaultIndex, setIndex}: {defaultIndex: number, setIndex: Callback}) => {
    return (
        <button className="DotButton" onClick={() => {
            setIndex(defaultIndex);
            
        }}></button>
    );
};

export default DotButton;

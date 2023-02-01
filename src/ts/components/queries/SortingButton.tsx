import React from 'react';
import {SortOrder} from "../../API/query_builder/queries.types";
import {Callback} from "../../types/callback.type";

const SortButton = ({order, onClick, children}: {
    order: SortOrder | "",
    onClick: Callback,
    children: string,
}) => {
    return (
        <button className={`sort-button ${order}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default SortButton;

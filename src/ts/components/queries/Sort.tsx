import React, {useState} from 'react';
import SortButton from "./SortingButton";
import {APISort, SortOrder} from "../../API/query_builder/queries/queries.types";
import {sorts} from "../../API/query_builder/queries/API_queries";
import {Callback} from "../../types/basic.types";
import {IQueryBuilder} from "../../API/query_builder/IQueryBuilder";

type SortField = "date" | "title";

type SortLambda = (order: SortOrder) => APISort;

type SortButton = {
    field: SortField, caption: string, sort: SortLambda
}

const sortButtons: SortButton[] = [
    {field: "date", caption: "Датою", sort: sorts.byDate},
    {field: "title", caption: "Назвою", sort: sorts.byTitle},
];


const Sort = ({qb, setQb}: {
    qb: IQueryBuilder,
    setQb: Callback
}) => {
    const [sortedField, setSortedField] = useState<SortField>("date");
    const [order, setOrder] = useState<SortOrder>("desc");

    function handleSort(field: SortField, sort: SortLambda) {
        if (sortedField !== field) setSortedField(field);

        setOrder(order === 'asc' ? 'desc' : 'asc');

        setQb(qb.setSort(sort(order)).updated());
    }

    return (
        <div id="posts-sort">
            {
                sortButtons.map((btn) =>
                    <SortButton
                        order={sortedField === btn.field ? order : ""}
                        onClick={() => handleSort(btn.field, btn.sort)}
                        key={btn.field}
                    >{btn.caption}</SortButton>
                )
            }
        </div>
    );
};

export default Sort;

import React from 'react';
import ReactPaginate from "react-paginate";
import {IQueryBuilder} from "../API/query_builder/APIQueryBuilder";
import {Callback} from "../types/callback.type";

export type PaginationProps = {
    qb: IQueryBuilder,
    setQb: Callback
};

const Pagination = ({totalCount, qb, setQb}: PaginationProps & {totalCount: number}) => {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => setQb(qb.setPage(e.selected).updated())}
            pageRangeDisplayed={5}
            pageCount={totalCount}
            previousLabel="<"
        />
    );
};

export default Pagination;

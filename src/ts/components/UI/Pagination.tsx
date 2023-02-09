import React from 'react';
import ReactPaginate from "react-paginate";
import {IQueryBuilder} from "../../API/query_builder/APIQueryBuilder";
import {UseQB} from "../../types/basic.types";

export type PaginationProps<Q extends IQueryBuilder> = {
    useQb: UseQB<Q>
};

const Pagination = <Q extends IQueryBuilder>({totalCount, useQb}: PaginationProps<Q> & {
    totalCount: number
}) => {
    return (
        <ReactPaginate
            className="Pagination"
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={e => {
                useQb.setQb(useQb.qb.setPage(e.selected + 1).updated() as Q);
                console.log("clicked", e.selected)
            }}

            marginPagesDisplayed={1}
            pageCount={totalCount}
            forcePage={useQb.qb.pagination._page - 1}
            activeClassName="active"
            previousClassName="prev"
            nextClassName="next"
            disabledClassName="disabled"
        />
    );
};

export default Pagination;

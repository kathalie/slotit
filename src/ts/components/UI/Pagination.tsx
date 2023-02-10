import React from 'react';
import ReactPaginate from "react-paginate";
import {UseQB} from "../../types/basic.types";
import {IQueryBuilder} from "../../API/query_builder/IQueryBuilder";

export type PaginationProps<Q extends IQueryBuilder> = {
    useQb: UseQB<Q>
};

const Pagination = <Q extends IQueryBuilder>({totalCount, useQb}: PaginationProps<Q> & {
    totalCount: number
}) => {
    const forcePage = totalCount === 0 ? - 1 : useQb.qb.pagination._page -1;

    return (
        <>
            {
                totalCount === 0 ?
                    <p>Таких проектів не знайдено!</p> :
                    <ReactPaginate
                        className="Pagination"
                        breakLabel="..."
                        nextLabel=">"
                        previousLabel="<"
                        onPageChange={e => useQb.setQb(useQb.qb.setPage(e.selected + 1).updated() as Q)}
                        marginPagesDisplayed={1}
                        pageCount={totalCount}
                        forcePage={forcePage}
                        activeClassName="active"
                        previousClassName="prev"
                        nextClassName="next"
                        disabledClassName="disabled"
                    />
            }
        </>
    );
};

export default Pagination;

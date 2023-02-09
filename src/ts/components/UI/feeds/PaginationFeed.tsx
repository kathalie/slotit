import Feed, {FeedProps} from "./Feed";
import {UseQB} from "../../../types/basic.types";
import Pagination from "../Pagination";
import React from "react";
import {IQueryBuilder} from "../../../API/query_builder/IQueryBuilder";

const PaginationFeed = <T extends object, Q extends IQueryBuilder>({items, functionalComponent,
                                                     useQb, className
    }: FeedProps<T> & {
        useQb: UseQB<Q>
    }) => {
    return (
        <>
            <Feed items={items}
                  functionalComponent={functionalComponent}
                  className={className}
            />
            <Pagination useQb={useQb} totalCount={useQb.qb.totalPages}/>
        </>
    );
};

export default PaginationFeed;

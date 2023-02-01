import React, {useRef} from 'react';
import {useIntersectionObserver} from "../hooks/useIntersectionObserver";
import {Callback} from "../types/callback.type";
import {IQueryBuilder} from "../API/query_builder/APIQueryBuilder";
import Loader from "./UI/Loader";

const LazyLoading = ({qb, setQb, isLoading}: {
    qb: IQueryBuilder,
    setQb: Callback,
    isLoading: boolean
}) => {
    const lastElement = useRef<HTMLDivElement>(null);
    const currentPage = qb.pagination._page;

    useIntersectionObserver(lastElement, currentPage < qb.totalPages, isLoading, () => {
        setQb(qb.setPage(currentPage + 1).updated());
    })

    return (
        <>
            {
                isLoading && <Loader/>
            }
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
        </>
    );
};

export default LazyLoading;

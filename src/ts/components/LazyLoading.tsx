import React, {useRef} from 'react';
import {useIntersectionObserver} from "../hooks/useIntersectionObserver";
import {Callback} from "../types/callback.type";

type LazyLoadingProps = {
    page: number,
    setPage: Callback,
    totalPages: number,
    isLoading: boolean
}

const LazyLoading = ({page, setPage, totalPages, isLoading}: LazyLoadingProps) => {
    const lastElement = useRef<HTMLDivElement>(null);

    useIntersectionObserver(lastElement, page < totalPages, isLoading, () => {
        setPage(page + 1);
    })

    return (
        <div ref={lastElement} style={{height: 20, background: 'red'}}/>
    );
};

export default LazyLoading;

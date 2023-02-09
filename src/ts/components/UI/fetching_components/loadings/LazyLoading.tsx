import React, {useRef} from 'react';
import {useIntersectionObserver} from "../../../../hooks/useIntersectionObserver";
import {ComponentCreator, UseQB} from "../../../../types/basic.types";
import {IQueryBuilder} from "../../../../API/query_builder/APIQueryBuilder";
import Loader from "../../Loader";

const LazyLoading = <P extends object, Q extends IQueryBuilder>({componentCreator, fetchingHook, useQb}: {
    componentCreator: ComponentCreator<P>
    fetchingHook: () => [boolean, unknown],
    useQb: UseQB<Q>
}) => {
    const [loading, ] = fetchingHook();

    return (
        <>
            {
                componentCreator.creator(componentCreator.props)
            }
            <LazyLoader isLoading={loading} useQb={useQb}/>
        </>
    );
};

export default LazyLoading;

const LazyLoader = <P extends object, Q extends IQueryBuilder>({isLoading, useQb}: {
    isLoading: boolean,
    useQb: UseQB<Q>
}) => {
    const lastElement = useRef<HTMLDivElement>(null);
    const currentPage = useQb.qb.pagination._page;

    const canLoad = currentPage < useQb.qb.totalPages;

    useIntersectionObserver(lastElement, canLoad, isLoading, () => {
        useQb.setQb(useQb.qb
            .setPage(currentPage + 1)
            .updated() as Q
        );
    })

    return (
        <>
            {
                isLoading &&
                <Loader/>
            }
            <div ref={lastElement}/>
            {
                !canLoad &&
                <p>Наразі це все! Слідкуйте за нашими оновленнями! ;)</p>
            }
        </>
    );
};

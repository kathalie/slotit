import {APIFilter} from "../../API/query_builder/queries.types";
import {HasId} from "../../types/models";
import {ItemType} from "../../types/item.types";
import {IQueryBuilder} from "../../API/query_builder/APIQueryBuilder";
import {useFetchQueriedItems} from "../../hooks/useFetchQueriedItems";
import Filters from "../queries/Filters";
import {Feed, PaginationFeed} from "../feeds";
import React, {Children} from "react";
import {Callback} from "../../types/callback.type";
import LazyLoading from "../LazyLoading";
import {FetchingComponent} from "./base_fetching";

export const BaseFetchingFeed = ({className, children, qb, setQb, filters}: {
    className?: string,
    children: JSX.Element | JSX.Element[],
    qb: IQueryBuilder,
    setQb: Callback,
    filters: boolean
}) => {
    return (
        <div className={`BaseFetchingFeed ${className ?? ""}`}>
            {
                filters && <Filters qb={qb} setQb={setQb}/>
            }
            {
                Children.map(children, child => React.cloneElement(child))
            }
        </div>
    );
}

export const FetchingFeed = <T extends HasId>({className, itemType, componentCreator, qb, deps, filters = false}: {
    className?: string,
    itemType: ItemType<T>,
    qb: IQueryBuilder,
    componentCreator?: (props: {item: T}) => JSX.Element,
    deps?: any[],
    filters?: boolean,
}) => {
    const [useCallback, items, , setQb] = useFetchQueriedItems(itemType, qb, deps);

    return (
        <BaseFetchingFeed className={className} filters={filters} qb={qb} setQb={setQb}>
            <FetchingComponent componentCreator={Feed}
                               props={{items, itemType, componentCreator}}
                               fetchingHook={useCallback}/>
        </BaseFetchingFeed>
    )
};

export const FetchingPaginationFeed = <T extends HasId>({className, itemType, qb, setQb, deps, filters = false}: {
    className?: string,
    itemType: ItemType<T>,
    qb: IQueryBuilder,
    setQb: Callback,
    deps?: any[],
    filters?: boolean
}) => {

    const [useCallback, items,] = useFetchQueriedItems(itemType, qb, deps);

    return (
        <BaseFetchingFeed className={className} filters={filters} qb={qb} setQb={setQb}>
            <FetchingComponent componentCreator={PaginationFeed}
                               props={{items, itemType, qb, setQb}}
                               fetchingHook={useCallback}
            />
        </BaseFetchingFeed>
    )
};

let prevFilter: APIFilter | undefined | null = null;

export const FetchingLazyLoadingFeed = <T extends HasId>({className, itemType, qb, componentCreator, deps, filters = false, filter}: {
    className?: string,
    itemType: ItemType<T>,
    qb: IQueryBuilder,
    componentCreator?: (props: {item: T}) => JSX.Element,
    deps?: any[],
    filters?: boolean,
    filter?: APIFilter
}) => {
    const prevFilterValue = prevFilter === null || !prevFilter ?
        prevFilter :
        prevFilter().value;
    const filterValue = !filter ? filter : filter().value;

    const append: boolean = prevFilterValue == filterValue;
    prevFilter = filter;

    const [useCallback, items, , setQb] = useFetchQueriedItems(itemType, qb, deps, append);
    const [isLoading,] = useCallback();

    return (
        <BaseFetchingFeed className={className} filters={filters} qb={qb} setQb={setQb}>
            <Feed items={items} itemType={itemType} componentCreator={componentCreator}/>
            <LazyLoading isLoading={isLoading} qb={qb} setQb={setQb}/>
        </BaseFetchingFeed>
    )
};

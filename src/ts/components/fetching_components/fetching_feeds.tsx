import {APIFilter} from "../../API/query_builder/queries.types";
import {HasId} from "../../types/models";
import {ItemType} from "../../types/item.types";
import {IQueryBuilder} from "../../API/query_builder/APIQueryBuilder";
import {useFetchQueriedItems} from "../../hooks/useFetchQueriedItems";
import Filters from "../queries/Filters";
import {Feed, PaginationFeed} from "../feeds";
import React from "react";
import {Callback} from "../../types/callback.type";
import LazyLoading from "../LazyLoading";
import {FetchingComponent} from "./base_fetching";

export const FetchingFeed = <T extends HasId>({itemType, qb, deps, filters}: {
    itemType: ItemType<T>,
    qb: IQueryBuilder,
    deps?: any[],
    filters?: boolean
}) => {
    const [useCallback, items, , setQb] = useFetchQueriedItems(itemType, qb, deps);

    return (
        <>
            {
                filters && <Filters qb={qb} setQb={setQb}/>
            }
            <FetchingComponent componentCreator={Feed} props={{items, itemType}} fetchingHook={useCallback}/>
        </>
    )
};
export const FetchingPaginationFeed = <T extends HasId>({itemType, qb, setQb, deps, filters}: {
    itemType: ItemType<T>,
    qb: IQueryBuilder,
    setQb: Callback,
    deps?: any[],
    filters?: boolean
}) => {

    const [useCallback, items,] = useFetchQueriedItems(itemType, qb, deps);

    return (
        <>
            {
                filters && <Filters qb={qb} setQb={setQb}/>
            }
            <FetchingComponent componentCreator={PaginationFeed}
                               props={{items, itemType, qb, setQb}}
                               fetchingHook={useCallback}
            />
        </>
    )
};
let prevFilter: APIFilter | undefined | null = null;
export const FetchingLazyLoadingFeed = <T extends HasId>({itemType, qb, deps, filters, filter}: {
    itemType: ItemType<T>,
    qb: IQueryBuilder,
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
        <>
            {
                filters && <Filters qb={qb} setQb={setQb}/>
            }
            <Feed items={items} itemType={itemType}/>
            <LazyLoading isLoading={isLoading} qb={qb} setQb={setQb}/>
        </>
    )
};

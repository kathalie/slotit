import React, {useMemo, useState} from 'react';
import {HasId} from "../types/models";
import {Callback} from "../types/callback.type";
import ComponentController from "./ComponentController";
import {useFetchItem, useFetchItems} from "../hooks/useFetching";
import {Feed, PaginationFeed} from "./feeds";
import {IQueryBuilder} from "../API/query_builder/APIQueryBuilder";
import {ItemType} from "../types/item.types";
import Filters from "./queries/Filters";
import LazyLoading from "./LazyLoading";
import {APIFilter} from "../API/query_builder/queries.types";

export const FetchingComponent = <T extends HasId>({componentCreator, props, fetchingHook}: {
    componentCreator: (props: any) => JSX.Element,
    props: object,
    fetchingHook: () => [boolean, unknown]
}) => {
    const [loading, error] = fetchingHook();

    return (
        <ComponentController
            componentCreator={componentCreator}
            props={props}
            error={error}
            isLoading={loading}
        />
    );
};

export const FetchingItemContent = <T extends HasId>({itemType, componentCreator, id, deps}: {
    itemType: ItemType<T>,
    componentCreator?: (props: any) => JSX.Element,
    id: number,
    deps?: any[]
}) => {
    const [item, setItem]: [T, Callback] = useState({} as T);

    function useFetchItemCallback() {
        return useFetchItem<T>(id, setItem, itemType.service, deps ?? []);
    }

    return <FetchingComponent componentCreator={componentCreator ?? itemType.cardCreator} props={{item}}
                              fetchingHook={useFetchItemCallback}/>
}

//TODO  RE-RENDERING OF THE PAGE AND CONSEQUENT ITEMS DUPLICATION
//
// export const useItems = <T extends HasId>(items: T[], qb: IQueryBuilder) => {
//     return useMemo(() => {
//         return items;
//     }, [items]);
// }

function useFetchQueriedItems<T extends HasId>(itemType: ItemType<T>, qb: IQueryBuilder, deps: any[] = [], append: boolean = false)
    : [Callback, T[], IQueryBuilder, Callback] {
    const [items, setItems]: [T[], Callback] = useState([]);
    const [updatedQb, setQb] = useState(qb);

    const useCallback = () => useFetchItems<T>(
        setItems, itemType.service, qb, [updatedQb, ...deps ?? []], append ? items : []
    );

    //const memoizedItems = useItems(items, qb);

    return [useCallback, items, updatedQb, setQb];
}


export const FetchingSpecificCard = <T extends HasId>({itemType, qb, deps}: {
    itemType: ItemType<T>,
    qb: IQueryBuilder,
    deps?: any[]
}) => {
    const [useCallback, items] = useFetchQueriedItems(itemType, qb, deps);

    return <FetchingComponent componentCreator={itemType.cardCreator} props={{item: items[0]}}
                              fetchingHook={useCallback}/>
}

export const FetchingFeed = <T extends HasId>({itemType, qb, deps, filters}: {
    itemType: ItemType<T>,
    qb: IQueryBuilder,
    deps?: any[],
    filters?: boolean
}) => {
    const [useCallback, items, ,setQb] = useFetchQueriedItems(itemType, qb, deps);

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

    const [useCallback, items, ] = useFetchQueriedItems(itemType, qb, deps);

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

    const [useCallback, items, ,setQb] = useFetchQueriedItems(itemType, qb, deps, append);
    const [isLoading, ] = useCallback();

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

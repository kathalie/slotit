import React, {useState} from 'react';
import {HasId} from "../types/models";
import {Callback} from "../types/callback.type";
import ComponentController from "./ComponentController";
import {useFetchItem, useFetchItems} from "../hooks/useFetching";
import {Feed} from "./Feed";
import {APIQueryBuilder, IQueryBuilder} from "../API/query_builder/APIQueryBuilder";
import {ItemType} from "../types/item.types";

type FetchingComponentProps = {
    componentCreator: (props: any) => JSX.Element,
    props: object,
    useCallback: Callback,
    lazyLoading?: (isLoading: boolean) => JSX.Element
}

export const FetchingComponent = <T extends HasId>({componentCreator, props, useCallback, lazyLoading}: FetchingComponentProps) => {
    const [areItemsLoading, itemsError] = useCallback();

    return (
        <>
            <ComponentController
                componentCreator={componentCreator}
                props={props}
                error={itemsError}
                isLoading={areItemsLoading}
            />
            {lazyLoading ? lazyLoading(areItemsLoading) : <></>}
        </>

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

    return <FetchingComponent componentCreator={componentCreator ?? itemType.cardCreator} props={{item}} useCallback={useFetchItemCallback}/>
}

export const FetchingSpecificCard = <T extends HasId>({itemType, queryBuilder, deps}: {
    itemType: ItemType<T>,
    queryBuilder: IQueryBuilder,
    deps?: any[]
}) => {
    const [items, setItems]: [T[], Callback] = useState([]);

    function useFetchItemsCallback() {
        return useFetchItems<T>(items, setItems, itemType.service, queryBuilder, deps ?? []);
    }

    return <FetchingComponent componentCreator={itemType.cardCreator} props={{item: items[0]}} useCallback={useFetchItemsCallback}/>
}


export const FetchingFeed = <T extends HasId>({itemType, queryBuilder, deps,lazyLoading}: {
    itemType: ItemType<T>,
    queryBuilder: APIQueryBuilder,
    deps?: any[],
    lazyLoading?: (isLoading: boolean) => JSX.Element
}) => {
    const [items, setItems]: [T[], Callback] = useState([]);

    function useCallback() {
        return useFetchItems<T>(items, setItems, itemType.service, queryBuilder, deps ?? []);
    }

    return <FetchingComponent componentCreator={Feed} props={{items, itemType}} useCallback={useCallback} lazyLoading={lazyLoading}/>
};

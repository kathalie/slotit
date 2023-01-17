import React, {useState} from 'react';
import {HasId} from "../types/models";
import {Callback} from "../types/callback.type";
import ComponentController from "./ComponentController";
import {useFetchItem, useFetchItems} from "../hooks/useFetching";
import {Feed} from "./feeds";
import {APIQueryBuilder} from "../API/APIQueryBuilder";
import {ItemType} from "../types/item.types";

type FetchingComponentProps = {
    componentCreator: (props: any) => JSX.Element,
    props: object,
    useCallback: Callback
}

export const FetchingComponent = <T extends HasId>({componentCreator, props, useCallback}: FetchingComponentProps) => {
    const [areItemsLoading, itemsError] = useCallback();

    return (
        <ComponentController
            componentCreator={componentCreator}
            props={props}
            error={itemsError}
            isLoading={areItemsLoading}
        />
    );
};

type FetchingCardProps<T extends HasId> = {
    itemType: ItemType<T>,
    id: number,
    deps?: any[]
}

export const FetchingCard = <T extends HasId>({itemType, id, deps}: FetchingCardProps<T>) => {
    const [item, setItem]: [T, Callback] = useState({} as T);

    function useFetchItemCallback() {
        return useFetchItem<T>(id, setItem, itemType.service, deps ?? []);
    }

    return <FetchingComponent componentCreator={itemType.cardCreator} props={{item}} useCallback={useFetchItemCallback}/>
}

type FetchingFeedProps<T extends HasId> = {
    itemType: ItemType<T>,
    queryBuilder: APIQueryBuilder,
    deps?: any[]
}

export const FetchingFeed = <T extends HasId>({itemType, queryBuilder, deps}: FetchingFeedProps<T>) => {
    const [items, setItems]: [T[], Callback] = useState([]);

    function useCallback() {
        return useFetchItems<T>(items, setItems, itemType.service, queryBuilder, deps ?? []);
    }

    return <FetchingComponent componentCreator={Feed} props={{items, itemType}} useCallback={useCallback} />
};

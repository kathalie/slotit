import {HasId} from "../../types/models";
import {ItemType} from "../../types/item.types";
import {Callback} from "../../types/callback.type";
import React, {useState} from "react";
import {useFetchItem} from "../../hooks/useFetching";
import {IQueryBuilder} from "../../API/query_builder/APIQueryBuilder";
import {useFetchQueriedItems} from "../../hooks/useFetchQueriedItems";
import {FetchingComponent} from "./base_fetching";

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
export const FetchingSpecificCard = <T extends HasId>({itemType, qb, deps}: {
    itemType: ItemType<T>,
    qb: IQueryBuilder,
    deps?: any[]
}) => {
    const [useCallback, items] = useFetchQueriedItems(itemType, qb, deps);

    return <FetchingComponent componentCreator={itemType.cardCreator} props={{item: items[0]}}
                              fetchingHook={useCallback}/>
}

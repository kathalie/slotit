import {HasId} from "../../../types/models";
import {ItemType} from "../../../types/item.types";
import React, {useState} from "react";
import {useFetchItem} from "../../../hooks/useFetching";
import LoadedComponent from "./loadings/LoadedComponent";

const FetchedById = <T extends HasId>({itemType, cardCreator, id, deps}: {
    itemType: ItemType<T>,
    cardCreator: ({item}: {item: T}) => JSX.Element,
    id: number,
    deps?: any[]
}) => {
    const [item, setItem] = useState<T>({} as T);

    const useFetchingHook = () => useFetchItem<T>(id, setItem, itemType.service, deps ?? []);

    return <LoadedComponent componentCreator={{creator: cardCreator, props: {item}}}
                            fetchingHook={useFetchingHook}/>
}

export default FetchedById;

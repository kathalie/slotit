import React, {useState} from "react";

import {HasId} from "../../../types/models";
import {ItemType} from "../../../types/item.types";
import LoadedComponent from "./loadings/LoadedComponent";
import {IQueryBuilder} from "../../../API/query_builder/IQueryBuilder";
import {useFetchItems} from "../../../hooks/useFetching";

const FetchedCard = <T extends HasId>({className, itemType, cardCreator, qb, deps}: {
    className?: string,
    itemType: ItemType<T>,
    cardCreator: ({item, className}: { item: T, className?: string }) => JSX.Element,
    qb: IQueryBuilder,
    deps?: any[]
}) => {
    const [items, setItems] = useState([]);

    const useFetchingHook = () => useFetchItems<T>(setItems, itemType.service, qb);

    return <LoadedComponent componentCreator={{creator: cardCreator, props: {item: items[0], className}}}
                            fetchingHook={useFetchingHook}/>
}

export default FetchedCard;

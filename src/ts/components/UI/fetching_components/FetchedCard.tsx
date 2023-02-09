import React from "react";

import {HasId} from "../../../types/models";
import {ItemType} from "../../../types/item.types";
import {IQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {useFetchQueriedItems} from "../../../hooks/useFetchQueriedItems";
import LoadedComponent from "./loadings/LoadedComponent";

const FetchedCard = <T extends HasId>({className, itemType, cardCreator, qb, deps}: {
    className?: string,
    itemType: ItemType<T>,
    cardCreator: ({item, className}: { item: T, className?: string }) => JSX.Element,
    qb: IQueryBuilder,
    deps?: any[]
}) => {
    const [useCallback, items] = useFetchQueriedItems(itemType, qb, deps);

    return <LoadedComponent componentCreator={{creator: cardCreator, props: {item: items[0], className}}}
                            fetchingHook={useCallback}/>
}

export default FetchedCard;

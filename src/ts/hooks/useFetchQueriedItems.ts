import {HasId} from "../types/models";
import {ItemType} from "../types/item.types";
import {IQueryBuilder} from "../API/query_builder/APIQueryBuilder";
import {Callback} from "../types/callback.type";
import {useState} from "react";
import {useFetchItems} from "./useFetching";

//TODO  RE-RENDERING OF THE PAGE AND CONSEQUENT ITEMS DUPLICATION
//
// export const useItems = <T extends HasId>(items: T[], qb: IQueryBuilder) => {
//     return useMemo(() => {
//         return items;
//     }, [items]);
// }

export function useFetchQueriedItems<T extends HasId>(itemType: ItemType<T>, qb: IQueryBuilder, deps: any[] = [], append: boolean = false)
    : [Callback, T[], IQueryBuilder, Callback] {
    const [items, setItems]: [T[], Callback] = useState([]);
    const [updatedQb, setQb] = useState(qb);

    const useCallback = () => useFetchItems<T>(
        setItems, itemType.service, qb, [updatedQb, ...deps ?? []], append ? items : []
    );

    //const memoizedItems = useItems(items, qb);

    return [useCallback, items, updatedQb, setQb];
}

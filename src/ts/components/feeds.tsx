import React from 'react';
import {HasId} from "../types/models";
import {ItemType} from "../types/item.types";
import {IQueryBuilder} from "../API/query_builder/APIQueryBuilder";
import {Callback} from "../types/callback.type";
import Pagination from "./Pagination";

type FeedProps<T extends HasId> = {
    items: T[]
    itemType: ItemType<T>,
}

export const Feed = <T extends HasId>({items, itemType}: FeedProps<T>) => {
    return (
        <div>
            {items.map((item: T) =>
                <div key={item.id}>
                    {itemType.cardCreator({item})}
                </div>
            )}
        </div>
    );
};

export const PaginationFeed = <T extends HasId>({items, itemType, qb, setQb}: FeedProps<T> & {
    qb: IQueryBuilder,
    setQb: Callback
}) => {
    return (
        <>
            <Feed items={items} itemType={itemType}/>
            <Pagination qb={qb} setQb={setQb} totalCount={qb.totalPages}/>
        </>
    );
};

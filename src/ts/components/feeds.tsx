import React from 'react';
import {HasId} from "../types/models";
import {ItemType} from "../types/item.types";
import {IQueryBuilder} from "../API/query_builder/APIQueryBuilder";
import {Callback} from "../types/callback.type";
import Pagination from "./Pagination";

type FeedProps<T extends HasId> = {
    items: T[]
    itemType: ItemType<T>,
    componentCreator?: (props: {item: T}) => JSX.Element,
}

export const Feed = <T extends HasId>({items, itemType, componentCreator}: FeedProps<T>) => {
    return (
        <>
            {items.map((item: T) =>
                <React.Fragment key={item.id}>
                    {componentCreator ?
                        componentCreator({item}) :
                        itemType.cardCreator({item})}
                </React.Fragment>
            )}
        </>
    );
};

export const PaginationFeed = <T extends HasId>({items, itemType, componentCreator, qb, setQb}: FeedProps<T> & {
    qb: IQueryBuilder,
    setQb: Callback
}) => {
    return (
        <>
            <Feed items={items} itemType={itemType} componentCreator={componentCreator}/>
            <Pagination qb={qb} setQb={setQb} totalCount={qb.totalPages}/>
        </>
    );
};

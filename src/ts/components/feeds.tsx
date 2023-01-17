import React from 'react';
import {HasId} from "../types/models";
import {ItemType} from "../types/item.types";

type ListProps<T> = {
    items: T[]
}

type FeedProps<T extends HasId> = ListProps<T> & {
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



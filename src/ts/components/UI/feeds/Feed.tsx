import React from "react";
import {concatClassNames} from "../../../utils/concatClassNames";
import {HasId} from "../../../types/models";

export type FeedProps<T extends HasId> = {
    items: T[]
    functionalComponent: React.FC<{ item: T}>,
    className?: string
}

const Feed = <T extends HasId>(props: FeedProps<T>) => {
    return (
        <div className={concatClassNames("Feed", props.className)}>
            {props.items.map((item) =>
                <props.functionalComponent item={item} key={item.id}/>
            )}
        </div>
    );
};

export default Feed;

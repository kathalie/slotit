import React from "react";

export type FeedProps<T extends object> = {
    items: T[]
    functionalComponent: React.FC<{ item: T}>,
    className?: string
}

const Feed = <T extends object>(props: FeedProps<T>) => {
    return (
        <div className={`Feed ${props.className ?? ""}`}>
            {props.items.map((item, index) =>
                <props.functionalComponent item={item} key={index}/>
            )}
        </div>
    );
};

export default Feed;

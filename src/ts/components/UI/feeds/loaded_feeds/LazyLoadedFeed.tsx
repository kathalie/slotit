import React from 'react';
import Feed, {FeedProps} from "../Feed";
import LazyLoading from "../../fetching_components/loadings/LazyLoading";
import {IQueryBuilder} from "../../../../API/query_builder/APIQueryBuilder";
import {UseQB} from "../../../../types/basic.types";

const LazyLoadedFeed = <T extends object, Q extends IQueryBuilder>({feedProps, fetchingHook, useQb}: {
    feedProps: FeedProps<T>,
    fetchingHook: () => [boolean, unknown],
    useQb: UseQB<Q>
}) => {
    return (
        <LazyLoading componentCreator={{creator: Feed, props: feedProps}}
                     fetchingHook={fetchingHook}
                     useQb={useQb}
        />
    );
};

export default LazyLoadedFeed;

import React from 'react';
import Feed, {FeedProps} from "../Feed";
import LazyLoading from "../../fetching_components/loadings/LazyLoading";
import {UseQB} from "../../../../types/basic.types";
import {IQueryBuilder} from "../../../../API/query_builder/IQueryBuilder";
import {HasId} from "../../../../types/models";

const LazyLoadedFeed = <T extends HasId, Q extends IQueryBuilder>({feedProps, fetchingHook, useQb}: {
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

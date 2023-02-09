import React from 'react';
import {FeedProps} from "../Feed";
import {UseQB} from "../../../../types/basic.types";
import LoadedComponent from "../../fetching_components/loadings/LoadedComponent";
import PaginationFeed from "../PaginationFeed";
import {IQueryBuilder} from "../../../../API/query_builder/IQueryBuilder";

const LoadedPaginationFeed = <T extends object, Q extends IQueryBuilder>({feedProps, fetchingHook}: {
    feedProps: FeedProps<T> & { useQb: UseQB<Q> },
    fetchingHook: () => [boolean, unknown],
}) => {

    return (
        <LoadedComponent componentCreator={{creator: PaginationFeed, props: feedProps}}
                         fetchingHook={fetchingHook}
        />
    );
};

export default LoadedPaginationFeed;

import React from 'react';
import LoadedComponent from "../../fetching_components/loadings/LoadedComponent";
import Feed, {FeedProps} from "../Feed";
import {HasId} from "../../../../types/models";

const LoadedFeed = <T extends HasId>({feedProps, fetchingHook}: {
    feedProps: FeedProps<T>,
    fetchingHook: () => [boolean, unknown],
}) => {

    return (
        <LoadedComponent componentCreator={{creator: Feed, props: feedProps}}
                         fetchingHook={fetchingHook}
        />
    );
};

export default LoadedFeed;

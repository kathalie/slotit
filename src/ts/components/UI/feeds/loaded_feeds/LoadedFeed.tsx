import React from 'react';
import LoadedComponent from "../../fetching_components/loadings/LoadedComponent";
import Feed, {FeedProps} from "../Feed";

const LoadedFeed = <T extends object>({feedProps, fetchingHook}: {
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

import {FeedProps} from "../Feed";
import {UseQB} from "../../../../types/basic.types";
import {IQueryBuilder} from "../../../../API/query_builder/APIQueryBuilder";

export type CommonLoadedFeedProps = {
    feedProps: FeedProps<object> | (FeedProps<object> & { useQb: UseQB<IQueryBuilder> }),
    fetchingHook: () => [boolean, unknown],
}

export type ExtendedLoadedFeedProps = CommonLoadedFeedProps & {useQb: UseQB<IQueryBuilder>}

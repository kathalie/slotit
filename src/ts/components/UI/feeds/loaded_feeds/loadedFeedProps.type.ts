import {FeedProps} from "../Feed";
import {UseQB} from "../../../../types/basic.types";
import {IQueryBuilder} from "../../../../API/query_builder/IQueryBuilder";
import {HasId} from "../../../../types/models";

export type CommonLoadedFeedProps = {
    feedProps: FeedProps<HasId> | (FeedProps<HasId> & { useQb: UseQB<IQueryBuilder> }),
    fetchingHook: () => [boolean, unknown],
}

export type ExtendedLoadedFeedProps = CommonLoadedFeedProps & {useQb: UseQB<IQueryBuilder>}

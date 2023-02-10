import React, {useMemo, useState} from 'react';
import {APIFilter} from "../../../API/query_builder/queries/queries.types";
import {JSONServerQueryBuilder} from "../../../API/query_builder/JSONServerQueryBuilder";
import {sorts} from "../../../API/query_builder/queries/API_queries";
import {PostCard} from "../../cards/PostCard";
import FetchedFeed, {feedPagination} from "../../UI/fetching_components/FetchedFeed";
import {useFetchPosts} from "../../UI/fetching_components/useFetchItems";
// @ts-ignore
import Queries, {ParticularQueries} from "../../queries/Queries.tsx";
import {uiFilters, uiSorts} from "../../queries/particularQueries";

export type PostPageProps = {
    filter?: APIFilter;
}

const PostsPage = ({filter}: PostPageProps) => {
    const [qb, setQb] = useState(new JSONServerQueryBuilder()
        .setLimit(5)
        .setSort(sorts.byDate("desc"))
    );

    useMemo(() => {
        qb.removeAllFilters();
        setQb(filter ?
            qb.addFilter(filter).updated() :
            qb.updated())
    }, [filter]);

    const queries: ParticularQueries = {
        sorts: [uiSorts.date, uiSorts.title],
        filters: [uiFilters.post.type],
        search: true
    }

    return (
        <div className="PostsPage">
            <h1>Пости</h1>
            {
                !filter &&
                <Queries queries={queries} useQb={{qb, setQb}}/>
            }
            <FetchedFeed useQb={{qb, setQb}}
                         card={PostCard}
                         fetchingHook={useFetchPosts}
                         pagination={feedPagination.LAZY_LOADING}
            />
        </div>
    );
};

export default PostsPage;

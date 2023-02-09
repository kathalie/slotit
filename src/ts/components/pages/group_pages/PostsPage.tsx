import React, {useState} from 'react';
import {APIFilter} from "../../../API/query_builder/queries/queries.types";
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {sorts} from "../../../API/query_builder/queries/API_queries";
import {PostCard} from "../../cards/PostCard";
import FetchedFeed, {feedPagination} from "../../UI/fetching_components/FetchedFeed";
import {useFetchPosts} from "../../UI/fetching_components/useFetchItems";

export type PostPageProps = {
    filter?: APIFilter;
}

const PostsPage = ({filter}: PostPageProps) => {
    let initialQb = new APIQueryBuilder()
        .setLimit(5)
        .setSort(sorts.byDate("desc"))
        .removeAllFilters();

    initialQb = filter ?
        initialQb.addFilter(filter).updated() :
        initialQb.updated();

    const [qb, setQb] = useState(initialQb);

    return (
        <div className="PostsPage">
            <h1>Пости</h1>
            <FetchedFeed useQb={{qb, setQb}}
                         card={PostCard}
                         fetchingHook={useFetchPosts}
                         pagination={feedPagination.LAZY_LOADING}
            />
        </div>
    );
};

export default PostsPage;

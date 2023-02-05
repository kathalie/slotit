import React from 'react';
import {ItemType} from "../../../types/item.types";
import {APIFilter} from "../../../API/query_builder/queries.types";
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {sorts} from "../../../API/query_builder/API_queries";
import {FetchingLazyLoadingFeed} from "../../fetching_components/fetching_feeds";

export type PostPageProps = {
    filter?: APIFilter;
}

const PostsPage = ({filter}: PostPageProps) => {
    let qb = new APIQueryBuilder()
        .setLimit(5)
        .setSort(sorts.byDate("desc"))
        .removeAllFilters();

    qb = filter ?
        qb.addFilter(filter).updated() :
        qb.updated();

    return (
        <div className="PostsPage">
            <h1>Пости</h1>
            <FetchingLazyLoadingFeed itemType={ItemType.Post}
                                     qb={qb}
                                     deps={[qb]}
                                     filters={!filter}
                                     filter={filter}
                                     className="posts"
            />
        </div>
    );
};

export default PostsPage;

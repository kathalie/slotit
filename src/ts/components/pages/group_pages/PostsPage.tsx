import React from 'react';
import {FetchingLazyLoadingFeed} from "../../FetchingComponent";
import {ItemType} from "../../../types/item.types";
import {APIFilter} from "../../../API/query_builder/queries.types";
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {sorts} from "../../../API/query_builder/API_queries";

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
        <div>
            <h1>Пости</h1>
            <FetchingLazyLoadingFeed itemType={ItemType.Post}
                                     qb={qb}
                                     deps={[qb]}
                                     filters={!filter}
                                     filter={filter}
            />
        </div>
    );
};

export default PostsPage;

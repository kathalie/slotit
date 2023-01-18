import React, {useState} from 'react';
import {FetchingFeed} from "../../FetchingComponent";
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {ItemType} from "../../../types/item.types";
import {APIFilter} from "../../../API/query_builder/queries.types";

export type PostPageProps = {
    filter?: APIFilter;
}

const PostsPage = ({filter}: PostPageProps) => {
    const [page, setPage] = useState(1);

    const queryBuilder = new APIQueryBuilder()
        .setPage(page);
    if(filter) queryBuilder.addFilter(filter);

    //TODO update querybuilder when changes in filters

    return (
        <div>
            <h1>Статті</h1>
            {/*<Filters queries={queries} setQueries={setQueries}/>*/} // TODO!!!!!!!!!!!
            <FetchingFeed itemType={ItemType.Post} queryBuilder={queryBuilder} deps={[queryBuilder]}/>

        </div>
    );
};

export default PostsPage;

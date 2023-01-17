import React, {useState} from 'react';
import {FetchingFeed} from "../../FetchingComponent";
import {APIFilter, APIQueryBuilder} from "../../../API/APIQueryBuilder";
import {ItemType} from "../../../types/item.types";

export type ArticlePageProps = {
    filter?: APIFilter;
}

const ArticlesPage = ({filter}: ArticlePageProps) => {
    // const [queries, setQueries] = useState({
    //     filter: "",
    //     sort: [{
    //         _sort: "date",
    //         _order: "desc" as SortOrder
    //     }]
    // });
    //
    // const queryParams: QueryParams = {
    //     pagination: {
    //         _page: 1,
    //         _limit: 10
    //     }
    // }
    const limit = 10;
    const [page, setPage] = useState(1);

    const queryBuilder = new APIQueryBuilder({_limit: limit, _page: page});
    if(filter) queryBuilder.addFilter(filter);

    //TODO update querybuilder when changes in filters

    return (
        <div>
            <h1>Статті</h1>
            {/*<Filters queries={queries} setQueries={setQueries}/>*/} // TODO!!!!!!!!!!!
            <FetchingFeed itemType={ItemType.Article} queryBuilder={queryBuilder} deps={[queryBuilder]}/>

        </div>
    );
};

export default ArticlesPage;

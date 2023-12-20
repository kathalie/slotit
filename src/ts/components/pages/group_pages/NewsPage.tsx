import React, {useEffect, useState} from 'react';
import {JSONServerQueryBuilder} from "../../../API/query_builder/JSONServerQueryBuilder";
import FetchedFeed, {feedPagination} from "../../UI/fetching_components/FetchedFeed";
import {useFetchNews} from "../../UI/fetching_components/useFetchItems";
import {newsCardCreator} from "../../UI/fetching_components/itemCardsCreators";
// @ts-ignore
import Queries, {ParticularQueries} from "../../queries/Queries.tsx";
import {uiSorts} from "../../queries/particularQueries";
import {sorts} from "../../../API/query_builder/queries/API_queries";


const NewsPage = () => {
    const [qb, setQb] = useState(new JSONServerQueryBuilder()
        .setLimit(10)
        .setSort(sorts.byDate("desc"))
    );

    const queries: ParticularQueries = {
        sorts: [uiSorts.date, uiSorts.newsProject],
        search: true
    }

    return (
        <div className={"NewsPage"}>
            <h1>Новини</h1>
            <Queries queries={queries} useQb={{qb, setQb}}/>
            <FetchedFeed useQb={{qb, setQb}}
                         card={newsCardCreator}
                         fetchingHook={useFetchNews(true)}
                         pagination={feedPagination.LAZY_LOADING}
            />
        </div>
    );
};

export default NewsPage;

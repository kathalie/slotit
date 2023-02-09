import React, {useState} from 'react';
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import FetchedFeed, {feedPagination} from "../../UI/fetching_components/FetchedFeed";
import {useFetchNews} from "../../UI/fetching_components/useFetchItems";
import {newsCardCreator} from "../../UI/fetching_components/itemCardsCreators";


const NewsPage = () => {
    const [qb, setQb] = useState(new APIQueryBuilder()
        .setLimit(10));

    return (
        <div>
            <h1>Новини</h1>
            <FetchedFeed useQb={{qb, setQb}}
                         card={newsCardCreator}
                         fetchingHook={useFetchNews(true)}
                         pagination={feedPagination.LAZY_LOADING}
            />
        </div>
    );
};

export default NewsPage;

import React from 'react';
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {ItemType} from "../../../types/item.types";
import {FetchingFeed} from "../../fetching_components/fetching_feeds";

const NewsPage = () => {
    const qb = new APIQueryBuilder();

    return (
        <div>
            <h1>Новини</h1>
            <FetchingFeed itemType={ItemType.News} qb={qb} deps={[qb]} filters={true}/>
        </div>
    );
};

export default NewsPage;

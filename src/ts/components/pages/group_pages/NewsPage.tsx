import React from 'react';
import {FetchingFeed} from "../../FetchingComponent";
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {ItemType} from "../../../types/item.types";

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

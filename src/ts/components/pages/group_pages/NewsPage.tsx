import React, {useState} from 'react';
import {FetchingFeed} from "../../FetchingComponent";
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {ItemType} from "../../../types/item.types";
import LazyLoading from "../../LazyLoading";

const NewsPage = () => {
    const [page, setPage] = useState(1);
    const totalPages = 2; // TODO !!!!!!!

    const queryBuilder = new APIQueryBuilder()
        .setPage(page);

    const lazyLoading = (isLoading: boolean) => (
        <LazyLoading isLoading={isLoading} totalPages={totalPages} page={page} setPage={setPage}/>
    )


    return (
        <div>
            <h1>Новини</h1>
            <FetchingFeed itemType={ItemType.News} queryBuilder={queryBuilder} deps={[page]} lazyLoading={lazyLoading}/>
        </div>
    );
};

export default NewsPage;

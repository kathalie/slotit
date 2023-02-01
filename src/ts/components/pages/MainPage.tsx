import React from 'react';
import MainCarousel from "../UI/MainCarousel";
import {FetchingFeed, FetchingSpecificCard} from "../FetchingComponent";
import {APIQueryBuilder} from "../../API/query_builder/APIQueryBuilder";
import {ItemType} from "../../types/item.types";
import {filters, sorts} from "../../API/query_builder/API_queries";

const MainPage = () => {
    const postsQB = new APIQueryBuilder()
        .setLimit(3)
        .addSort(sorts.byDate("desc"));

    const projectsQB = new APIQueryBuilder()
        .setLimit(3)
        .addFilter(filters.projectFilters.byProcess(false));

    const projectInProcessQB = new APIQueryBuilder()
        .setLimit(1)
        .addFilter(filters.projectFilters.byProcess(true));

    return (
        <div>
            <MainCarousel/>
            <h1>Останні пости</h1>
            <FetchingFeed itemType={ItemType.Post} qb={postsQB}/>
            <h1>Готові круті проекти</h1>
            <FetchingFeed itemType={ItemType.Project} qb={projectsQB}/>
            <h1>Слідкуйте за роботою</h1>
            <FetchingSpecificCard itemType={ItemType.Project} qb={projectInProcessQB}/>
        </div>
    );
};

export default MainPage;

import React from 'react';
import MainCarousel from "../UI/MainCarousel";
import {FetchingCard, FetchingFeed} from "../FetchingComponent";
import {APIQueryBuilder, sorts} from "../../API/APIQueryBuilder";
import {ItemType} from "../../types/item.types";

const MainPage = () => {
    const postsQueryBuilder = new APIQueryBuilder({_limit: 3, _page: 1});
    postsQueryBuilder.addSort(sorts.byDate("desc"));

    const projectsQueryBuilder = new APIQueryBuilder({_limit: 3, _page: 1});

    const projectInProcessId = 1; //TODO add logic!!!

    return (
        <div>
            <MainCarousel/>
            <h1>Останні пости</h1>
            <FetchingFeed itemType={ItemType.Article} queryBuilder={postsQueryBuilder}/>
            <h1>Готові круті проекти</h1>
            <FetchingFeed itemType={ItemType.Project} queryBuilder={projectsQueryBuilder}/>
            <h1>Слідкуйте за роботою</h1>
            <FetchingCard itemType={ItemType.Project} id={projectInProcessId}/>

        </div>
    );
};

export default MainPage;

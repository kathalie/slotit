import React from 'react';
import MainCarousel from "../UI/MainCarousel";
import {APIQueryBuilder} from "../../API/query_builder/APIQueryBuilder";
import {ItemType} from "../../types/item.types";
import {filters, sorts} from "../../API/query_builder/API_queries";
import {FetchingFeed} from "../fetching_components/fetching_feeds";
import {FetchingSpecificCard} from "../fetching_components/fetching_single_components";
import LearnMore from "../UI/LearnMore";
import {links} from "../../router/routes";
import DynamicArrows from "../UI/dynamic_elements/DynamicArrows";
import {directions} from "../UI/AngleArrow";
import {ExtendedPostCard} from "../cards";

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
        <div className="MainPage">
            <MainCarousel/>
            <div className="main_container">
                <h1>Останні пости</h1>
                <FetchingFeed className="recent_posts" itemType={ItemType.Post} componentCreator={ExtendedPostCard} qb={postsQB}/>
                <LearnMore link={links.posts} caption="Всі пости"/>
                <hr className="main-hr"/>
            </div>
            <div className="main_container">
                <h1>Готові проекти</h1>
                <FetchingFeed className="best_projects" itemType={ItemType.Project} qb={projectsQB}/>
                <LearnMore link={links.projects} caption="Всі проекти"/>
                <hr className="main-hr"/>
            </div>
            <div className="main_container">
                <h1>Слідкуйте за роботою</h1>
                <div className="project_in_process">
                    <DynamicArrows direction={directions.toRight}/>
                    <FetchingSpecificCard itemType={ItemType.Project} qb={projectInProcessQB}/>
                    <DynamicArrows direction={directions.toLeft}/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;

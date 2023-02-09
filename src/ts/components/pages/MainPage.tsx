import React, {useState} from 'react';
import MainCarousel from "../main/MainCarousel";
import {APIQueryBuilder} from "../../API/query_builder/APIQueryBuilder";
import {ItemType} from "../../types/item.types";
import {filters, sorts} from "../../API/query_builder/API_queries";
import LearnMore from "../UI/LearnMore";
import {links} from "../../router/routes";
import DynamicArrows from "../UI/dynamic_elements/DynamicArrows";
import {directions} from "../UI/AngleArrow";
import {Project} from "../../types/models";
import ProjectCard, {pictureSize} from "../cards/ProjectCard";
import FetchedFeed, {feedPagination} from "../UI/fetching_components/FetchedFeed";
import {ExtendedPostCard} from "../cards/PostCard";
import {projectCardCreator} from "../UI/fetching_components/itemCardsCreators";
import {useFetchPosts, useFetchProjects} from "../UI/fetching_components/useFetchItems";
import FetchedCard from "../UI/fetching_components/FetchedCard";

const MainPage = () => {
    const [postsQB, setPostQb] = useState(new APIQueryBuilder()
        .setLimit(3)
        .addSort(sorts.byDate("desc")));

    const [projectsQB, setProjectsQb] = useState(new APIQueryBuilder()
        .setLimit(3)
        .addFilter(filters.projectFilters.byProcess(false)));

    const [projectInProcessQB, ] = useState(new APIQueryBuilder()
        .setLimit(1)
        .addFilter(filters.projectFilters.byProcess(true)));

    const projectCreator = ({item}: {item: Project}) => {
        return (
            <ProjectCard item={item}
                         pictureSize={pictureSize.SMALL}
                         isLink={true}
            />
        )
    }

    return (
        <div className="MainPage">
            <MainCarousel/>
            <div className="main_container">
                <h1>Останні пости</h1>
                <FetchedFeed useQb={{qb: postsQB, setQb: setPostQb}}
                             card={ExtendedPostCard}
                             fetchingHook={useFetchPosts}
                             pagination={feedPagination.NONE}
                />
                <LearnMore link={links.posts} caption="Всі пости"/>
                <hr className="main-hr"/>
            </div>
            <div className="main_container">
                <h1>Готові проекти</h1>
                <FetchedFeed useQb={{qb: projectsQB, setQb: setProjectsQb}}
                             card={projectCardCreator(pictureSize.SMALL, true)}
                             fetchingHook={useFetchProjects}
                             pagination={feedPagination.NONE}
                />
                <LearnMore link={links.projects} caption="Всі проекти"/>
                <hr className="main-hr"/>
            </div>
            <div className="main_container">
                <h1>Слідкуйте за роботою</h1>
                <div className="project_in_process">
                    <DynamicArrows direction={directions.toRight}/>
                    <FetchedCard cardCreator={projectCreator}
                                 itemType={ItemType.Project}
                                 qb={projectInProcessQB}
                    />
                    <DynamicArrows direction={directions.toLeft}/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;

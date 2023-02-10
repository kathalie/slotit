import React, {useState} from 'react';
import {JSONServerQueryBuilder} from "../../../API/query_builder/JSONServerQueryBuilder";
import FetchedFeed, {feedPagination} from "../../UI/fetching_components/FetchedFeed";
import {pictureSize} from "../../cards/ProjectCard";
import {projectCardCreator} from "../../UI/fetching_components/itemCardsCreators";
import {useFetchProjects} from "../../UI/fetching_components/useFetchItems";
// @ts-ignore
import Queries, {ParticularQueries} from "../../queries/Queries.tsx";

const ProjectsPage = () => {
    const [qb, setQb] = useState(new JSONServerQueryBuilder().setLimit(9));

    const queries: ParticularQueries = {
        search: true
    }

    return (
        <div className="ProjectsPage">
            <h1>Проекти</h1>
            <Queries queries={queries} useQb={{qb, setQb}}/>
            <FetchedFeed useQb={{qb, setQb}}
                         card={projectCardCreator(pictureSize.SMALL, true)}
                         fetchingHook={useFetchProjects}
                         pagination={feedPagination.PAGINATION}
            />
        </div>
    );
};

export default ProjectsPage;

import React, {useState} from 'react';
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import FetchedFeed, {feedPagination} from "../../UI/fetching_components/FetchedFeed";
import {pictureSize} from "../../cards/ProjectCard";
import {projectCardCreator} from "../../UI/fetching_components/itemCardsCreators";
import {useFetchProjects} from "../../UI/fetching_components/useFetchItems";

const ProjectsPage = () => {
    const [qb, setQb] = useState(new APIQueryBuilder().setLimit(9));

    return (
        <div className="ProjectsPage">
            <h1>Проекти</h1>
            <FetchedFeed useQb={{qb, setQb}}
                         card={projectCardCreator(pictureSize.SMALL, true)}
                         fetchingHook={useFetchProjects}
                         pagination={feedPagination.PAGINATION}
            />
            {/*<FetchedProjectsFeed qb={qb} />*/}
            {/*<FetchingPaginationFeed className="projects"*/}
            {/*                        itemType={ItemType.Project}*/}
            {/*                        qb={qb}*/}
            {/*                        setQb={setQb}*/}
            {/*                        deps={[qb]}*/}
            {/*/>*/}
        </div>
    );
};

export default ProjectsPage;

import React, {useState} from 'react';
import {FetchingFeed} from "../../FetchingComponent";
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {ItemType} from "../../../types/item.types";

const ProjectsPage = () => {
    const [page, setPage] = useState(1);

    const queryBuilder = new APIQueryBuilder()
        .setPage(page);


    return (
        <div>
            <h1>Проекти</h1>
            <FetchingFeed itemType={ItemType.Project} queryBuilder={queryBuilder}/>
        </div>
    );
};

export default ProjectsPage;

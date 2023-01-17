import React, {useState} from 'react';
import {FetchingFeed} from "../../FetchingComponent";
import {APIQueryBuilder} from "../../../API/APIQueryBuilder";
import {ItemType} from "../../../types/item.types";

const ProjectsPage = () => {
    const limit = 10;
    const [page, setPage] = useState(1);

    const queryBuilder = new APIQueryBuilder({_limit: limit, _page: page});


    return (
        <div>
            <h1>Проекти</h1>
            <FetchingFeed itemType={ItemType.Project} queryBuilder={queryBuilder}/>
        </div>
    );
};

export default ProjectsPage;

import React from 'react';
import {useParams} from "react-router-dom";
import {Project} from "../../../types/models";
import {FetchingFeed, FetchingItemContent} from "../../FetchingComponent";
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {ItemType} from "../../../types/item.types";
import {ProjectCard} from "../../cards";
import {filters, sorts} from "../../../API/query_builder/API_queries";

const IdProjectPage = () => {
    const {id} = useParams<{id:string}>();

    console.log(":id = ", id);

    const numberId: number = parseInt(id ?? "");

    return (
        <div>
            <FetchingProjectContent id={numberId}/>
            <h1>Новини проекту</h1>
            <ProjectNews id={numberId}/>
        </div>
    );
};

const FetchingProjectContent = ({id}: { id: number }) => {
    const creator = (project: Project) => (
        <div>
            <ProjectCard item={project}/>
            <div className="content">{project.content}</div>
        </div>
    );

    return <FetchingItemContent itemType={ItemType.Project} componentCreator={creator} id={id}/>
}

const ProjectNews = ({id}: { id: number }) => {
    const newsQueryBuilder = new APIQueryBuilder()
        .addSort(sorts.byDate("desc"))
        .addFilter(filters.newsFilters.byProject(id));

    return (
        <FetchingFeed itemType={ItemType.News} qb={newsQueryBuilder}/>
    );
}

export default IdProjectPage;

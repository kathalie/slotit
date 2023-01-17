import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {Project} from "../../../types/models";
import {FetchingComponent, FetchingFeed} from "../../FetchingComponent";
import {APIQueryBuilder, newsFilters, sorts} from "../../../API/APIQueryBuilder";
import {ItemType} from "../../../types/item.types";
import {useFetchItem} from "../../../hooks/useFetching";
import {projectsService} from "../../../../init";
import {ProjectCard} from "../../cards";

const IdProjectPage = () => {
    const {id} = useParams<{id:string}>();

    console.log(":id = ", id); //TODO Fix the problem!!!!!

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
    const [item, setItem] = useState({} as Project);

    function useFetchItemCallback() {
        return useFetchItem(id, setItem, projectsService);
    }

    const creator = (project: Project) => (
        <>
            <ProjectCard item={project}/>
            <div className="content">{project.content}</div>
        </>
    );

    return <FetchingComponent componentCreator={creator} props={item} useCallback={useFetchItemCallback}/>
}

const ProjectNews = ({id}: { id: number }) => {
    const newsQueryBuilder = new APIQueryBuilder({_page: 1, _limit: 10});
    newsQueryBuilder.addSort(sorts.byDate("desc"));
    newsQueryBuilder.addFilter(newsFilters.byProject(id));

    return (
        <FetchingFeed itemType={ItemType.News} queryBuilder={newsQueryBuilder}/>
    );
}

export default IdProjectPage;

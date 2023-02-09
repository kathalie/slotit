import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {Project} from "../../../types/models";
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {ItemType} from "../../../types/item.types";
import {filters, sorts} from "../../../API/query_builder/API_queries";
import FetchedById from "../../UI/fetching_components/FetchedById";
import ProjectCard, {pictureSize} from "../../cards/ProjectCard";
import FetchedFeed, {feedPagination} from "../../UI/fetching_components/FetchedFeed";
import {useFetchNews} from "../../UI/fetching_components/useFetchItems";
import {newsCardCreator} from "../../UI/fetching_components/itemCardsCreators";

const IdProjectPage = () => {
    const {id} = useParams<{ id: string }>();

    console.log(":id = ", id);

    const numberId: number = parseInt(id ?? "");

    return (
        <div>
            <FetchedProjectContent id={numberId}/>
            <h1>Новини проекту</h1>
            <ProjectNews id={numberId}/>
        </div>
    );
};

const FetchedProjectContent = ({id}: { id: number }) => {
    const creator = ({item}: { item: Project }) => (
        <div>
            <ProjectCard item={item}
                         pictureSize={pictureSize.LARGE}
            />
            <div className="content">{item.content}</div>
        </div>
    );

    return <FetchedById itemType={ItemType.Project}
                        cardCreator={creator}
                        id={id}/>
}

const ProjectNews = ({id}: { id: number }) => {
    const [qb, setQb] = useState(new APIQueryBuilder()
        .setLimit(10)
        .addSort(sorts.byDate("desc"))
        .addFilter(filters.newsFilters.byProject(id)));

    return (
        <FetchedFeed useQb={{qb, setQb}}
                     card={newsCardCreator}
                     fetchingHook={useFetchNews(false)}
                     pagination={feedPagination.LAZY_LOADING}
        />
    );
}

export default IdProjectPage;

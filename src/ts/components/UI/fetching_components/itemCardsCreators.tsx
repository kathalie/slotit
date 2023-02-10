import NewsCard from "../../cards/NewsCard";
import React from "react";
import {News, Project} from "../../../types/models";
import ProjectCard, {PictureSize} from "../../cards/ProjectCard";

export type NewsAndProject = { news: News, project?: Project, id: number };

export const newsCardCreator = ({item}: { item: NewsAndProject }) => {
    return (
        <NewsCard item={item.news} project={item.project}/>
    );
}

export const projectCardCreator = (pictureSize: PictureSize, isLink: boolean) => ({item}: { item: Project }) =>
    <ProjectCard item={item} pictureSize={pictureSize} isLink={isLink}/>;

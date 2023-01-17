import React from 'react';
import {News, Project} from "../../../types/models";
import {NewsFeed} from "../../feeds";
import {ProjectCard} from "../../cards";

type ProjectPageProps = {
    project: Project,
    news: News[]
}

const ProjectPage: React.FC<ProjectPageProps> = ({project, news}) => {
    return (
        <div>
            <ProjectCard item={project}/>
            <div className="description">{project.content}</div>
            <h1>Новини проекту</h1>
            <NewsFeed items={news}/>
        </div>
    );
};

export default ProjectPage;

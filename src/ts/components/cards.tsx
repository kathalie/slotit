import React from 'react';
import {Article, News, Project} from "../types/models";

export type CardProps<T> = {
    item: T,
}

export const NewsCard = ({item}: CardProps<News>) => {
    return (
        <div>
            <p className="date">{item.date.toString()}</p>
            <h2 className="title">{item.title}</h2>
            <p className="description">{item.description}</p>
            <img src={item.pictureThumbnail} alt={`Picture of ${item.title}`}/>
        </div>
    );
};

export const ProjectCard = ({ item }: CardProps<Project>)  => {
    return (
        <div className="project-card">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
        </div>
    );
};

//TODO
export const ArticleCard = ({ item }: CardProps<Article>)  => {
    return (
        <div className="project-card">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
        </div>
    );
};

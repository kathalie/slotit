import React from 'react';
import {Post, News, Project} from "../types/models";

export type CardProps<T> = {
    item: T
}

export const NewsCard = ({item}: CardProps<News>) => {
    return (
        <div className="NewsCard">
            <img src={item.smallPicture} alt={`Picture of news with title "${item.title}"`}/>
            <p className="date">{item.date.toString()}</p>
            <h2>{item.title}</h2>
            <p className="description">{item.description}</p>
        </div>
    );
};

export const ProjectCard = ({item}: CardProps<Project>) => {
    return (
        <div className="ProjectCard">
            <img src={item.smallPicture} alt={`Picture of project with title "${item.title}"`}/>
            <h2>{item.title}</h2>
            <p className="description">{item.description}</p>
        </div>
    );
};

export const PostCard = ({item}: CardProps<Post>) => {
    return (
        <div className="PostCard">
            <img src={item.smallPicture} alt={`Picture of post with title "${item.title}"`}/>
            <p className="date">{item.date.toString()}</p>
            <h2>{item.title}</h2>
            <p className="description">{item.description}</p>
        </div>
    );
};

import React from 'react';
import {Article, HasId, News, Project} from "../types/models";
import {ArticleCard, CardProps, NewsCard, ProjectCard} from "./cards";

type ListProps<T> = {
    items: T[]
}

type FeedProps<T> = ListProps<T> & {
    componentCreator: (item: CardProps<T>) => JSX.Element,
}

const Feed = <T extends HasId>({items, componentCreator}: FeedProps<T>) => {
    return (
        <div>
            {items.map((item: T) =>
                <div key={item.id}>
                    {componentCreator({item})}
                </div>
            )}
        </div>
    );
};

export const ProjectsFeed = ({items}: ListProps<Project>) => {
    return (
        <Feed<Project> componentCreator={ProjectCard} items={items}/>
    );
};

export const NewsFeed = ({items}: ListProps<News>) => {
    return (
        <Feed<News> componentCreator={NewsCard} items={items}/>
    );
};

export const ArticlesFeed = ({items}: ListProps<Article>) => {
    return (
        <Feed<Article> componentCreator={ArticleCard} items={items}/>
    );
};

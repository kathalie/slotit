import React, {Children, cloneElement} from 'react';
import {News, Post, PostType, Project} from "../types/models";
import {Link} from "react-router-dom";
import {links} from "../router/routes";
import DynamicArrows from "./UI/dynamic_elements/DynamicArrows";
import {directions} from "./UI/AngleArrow";

export type CardProps<T> = {
    item: T,
    className?: string
}

const LinkedCard = ({className, id, link, children}: {
    className?: string,
    id: number,
    link: string,
    children: JSX.Element[] | JSX.Element
}) => {
    return (
        <Link className={`LinkedCard ${className}`} style={{display: "block"}} to={link.replace(":id", id.toString())}>
            {
                Children.map(children, (child) => {
                    return cloneElement(child);
                })
            }
        </Link>
    )
}

function formattedDate(date: Date | string) {
    return new Date(date).toLocaleDateString("uk");
}

export const NewsCard = ({item, className}: CardProps<News>) => {
    return (
        <LinkedCard className={`NewsCard ${className ?? ""}`} id={item.id} link={links.newsId}>
            <img src={item.smallPicture} alt={`Picture of news with title "${item.title}"`}/>
            <p className="date">{formattedDate(item.date)}</p>
            <h2>{item.title}</h2>
            <p className="description">{item.description}</p>
        </LinkedCard>
    );
};

export const ProjectCard = ({item, className}: CardProps<Project>) => {
    return (
        <LinkedCard className={`ProjectCard ${className ?? ""}`} id={item.id} link={links.projectId}>
            <div className="picture_bg" style={{backgroundImage: `url(${item.smallPicture})`}}>
                <div className="summary">
                    <h2>{item.title}</h2>
                    <p className="description">{item.description}</p>
                </div>
            </div>
            {/*<img src={item.smallPicture} alt={`Picture of project with title "${item.title}"`}/>*/}

        </LinkedCard>
    );
};

export const PostCard = ({item, className, children}: CardProps<Post> & {
    children?: JSX.Element | JSX.Element[]
}) => {
    return (
        <div className={`PostCard ${className ?? ""}`}>
            <LinkedCard id={item.id} link={links.postId}>
                <img src={item.smallPicture} alt={`Picture of post with title "${item.title}"`}/>
                <div className="brief_info">
                    <p className="date">{formattedDate(item.date)}</p>
                    <div className="summary">
                        <h2>{item.title}</h2>
                        <p className="description">{item.description}</p>
                    </div>
                </div>
            </LinkedCard>
            {
                children && Children.map(children, (child) => React.cloneElement(child))
            }
        </div>
    );
};

export const ExtendedPostCard = ({item, className}: CardProps<Post>) => {
    const postTypesToLinks: Record<PostType, { link: string, caption: string }> = {
        blog: {link: links.blog, caption: "Перегляньте решту дописів у нашому блозі!"},
        translation: {link: links.translations, caption: "Усі переклади статей українською"}
    }

    return (
        <PostCard className={`ExtendedPostCard ${className ?? ""}`} item={item}>
            <Link to={postTypesToLinks[item.type].link}>
                <p>{postTypesToLinks[item.type].caption}</p>
                <DynamicArrows direction={directions.toRight}/>
            </Link>
        </PostCard>
    );
};

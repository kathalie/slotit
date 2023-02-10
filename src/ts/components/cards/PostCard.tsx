import React, {Children} from 'react';
import {Post, PostType} from "../../types/models";
import {Link} from "react-router-dom";
import {links} from "../../router/routes";
import DynamicArrows from "../UI/dynamic_elements/DynamicArrows";
import {directions} from "../UI/AngleArrow";
import {CardProps, LinkedCard} from "./LinkedCard";
import {formattedDate} from "../../utils/date";
import {JSXChildren} from "../../types/basic.types";
import {concatClassNames} from "../../utils/concatClassNames";

export const PostCard = ({item, className, children}: CardProps<Post> & {
    children?: JSXChildren
}) => {
    return (
        <div className={concatClassNames("PostCard", className)}>
            <LinkedCard id={item.id} link={links.postId}>
                <img className="picture" src={item.smallPicture} alt={`Picture of post with title "${item.title}"`}/>
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
        <PostCard className={concatClassNames("ExtendedPostCard", className)} item={item}>
            <Link to={postTypesToLinks[item.type].link}>
                <p>{postTypesToLinks[item.type].caption}</p>
                <DynamicArrows direction={directions.toRight}/>
            </Link>
        </PostCard>
    );
};

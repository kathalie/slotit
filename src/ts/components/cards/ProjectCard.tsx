import React from "react";

import {CardProps, LinkedCard} from "./LinkedCard";
import {Project} from "../../types/models";
import {links} from "../../router/routes";
import {ObjectValues} from "../../types/basic.types";
import {concatClassNames} from "../../utils/concatClassNames";

export type PictureSize = ObjectValues<typeof pictureSize>;

export const pictureSize = {
    SMALL: "smallPicture",
    LARGE: "largePicture",
} as const;

const ProjectCard = ({item, className, pictureSize, isLink = false}: CardProps<Project> & {
    pictureSize: PictureSize,
    isLink?: boolean;
}) => {
    const simpleProjectCard = <BaseProjectCard item={item} pictureSize={pictureSize}/>;

    if (isLink) return (
        <LinkedCard className={concatClassNames(className)} id={item.id} link={links.projectId}>
            {simpleProjectCard}
        </LinkedCard>
    );

    return (
        <>
            {simpleProjectCard}
        </>
    );
};

export default ProjectCard;


const BaseProjectCard = ({item, pictureSize, className}: CardProps<Project> & {
    pictureSize: PictureSize
}) => {
    return (
        <article className={concatClassNames( "ProjectCard", className)}>
            <div className={"picture_bg"}
                 style={{backgroundImage: `url(${item[pictureSize]})`}}>
                <div className="summary">
                    <h2>{item.title}</h2>
                    <p className="description">{item.description}</p>
                </div>
            </div>
        </article>
    );
};

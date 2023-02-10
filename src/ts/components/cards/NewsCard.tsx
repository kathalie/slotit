import {CardProps, LinkedCard} from "./LinkedCard";
import {News, Project} from "../../types/models";
import {links} from "../../router/routes";
import {formattedDate} from "../../utils/date";
import React from "react";
import ProjectCard, {pictureSize} from "./ProjectCard";
import {concatClassNames} from "../../utils/concatClassNames";

const NewsCard = ({item, project, className}: CardProps<News> & {
    project?: Project,
}) => {
    return (
        <div className={concatClassNames("NewsCard", className)}>
            {
                project &&
                <ProjectCard className="picture"
                             item={project}
                             pictureSize={pictureSize.SMALL}
                             isLink={true}
                />
            }
            <LinkedCard id={item.id} link={links.newsId}>
                <div className="brief_info">
                    <p className="date">{formattedDate(item.date)}</p>
                    <div className="summary">
                        <h2>{item.title}</h2>
                        <p className="description">{item.description}</p>
                    </div>
                </div>
            </LinkedCard>
        </div>
    );
};

export default NewsCard;

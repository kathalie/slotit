import {Link} from "react-router-dom";
import React, {Children, cloneElement} from "react";
import {JSXChildren} from "../../types/basic.types";

export type CardProps<T> = {
    item: T,
    className?: string,
}
export const LinkedCard = ({className, id, link, children}: {
    className?: string,
    id: number,
    link: string,
    children: JSXChildren
}) => {
    const linkToId = link.replace(":id", id.toString());

    return (
        <Link className={`LinkedCard ${className}`} style={{display: "block"}} to={linkToId}>
            {
                Children.map(children, (child) => {
                    return cloneElement(child);
                })
            }
        </Link>
    )
}

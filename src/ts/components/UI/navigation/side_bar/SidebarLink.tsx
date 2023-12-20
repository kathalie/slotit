import React from "react";
import {LinkToPage} from "../../../../router/routes";
import {SimpleNav} from "../InlineNavigation";

const SidebarLink = ({ link }: {link: LinkToPage}) => {
    return (
        <div className={"SidebarLink"}>
            {
                Array.isArray(link.link) ?
                    <details className={"toggle-link"}>
                        <summary>{link.caption}</summary>
                        {
                            link.link.map(subLink =>
                                <p className={"SidebarLink sub-link"}>
                                    <SimpleNav linkToPage={subLink} key={subLink.caption}/>
                                </p>
                            )
                        }
                    </details> :
                    <SimpleNav linkToPage={link}/>
            }
        </div>
    );
};

export default SidebarLink;

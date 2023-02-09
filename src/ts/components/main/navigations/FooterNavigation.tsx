import React from 'react';
import {flattenedNavigation, LinkToPage} from "../../../router/routes";
import {Link} from "react-router-dom";

const FooterNavigation = () => {
    return (
        <nav className="FooterNavigation">
            <ul>
                {flattenedNavigation.map((linkToPage: LinkToPage) =>
                    <li className="footer-link" key={linkToPage.caption}>
                        <Link to={linkToPage.link as string}>{linkToPage.caption}</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default FooterNavigation;

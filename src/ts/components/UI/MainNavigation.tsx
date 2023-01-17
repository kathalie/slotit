import React from 'react';
import {Link} from "react-router-dom";
import {pages} from "../../router/paths";

const MainNavigation = () => {
    return (
        <nav>
            <ul>
                {Object.values(pages.navLinks).map(page =>
                    <li key={page.link}>
                        <Link to={page.link}>{page.caption}</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default MainNavigation;

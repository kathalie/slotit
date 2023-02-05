import React from 'react';
import {Link} from "react-router-dom";
import {LinkToPage, navigation} from "../../../router/routes";

const MainNavigation = () => {
    return (
        <nav className="MainNavigation">
            <ul>
                {navigation.map((linkToPage: LinkToPage) =>
                    <li className="major-link" key={linkToPage.caption}>
                        {Array.isArray(linkToPage.link) ?
                            <DropdownNav linkToPage={linkToPage}/> :
                            <SimpleNav linkToPage={linkToPage}/>
                        }
                    </li>
                )}
            </ul>
        </nav>
    );
};

type NavProps = {
    linkToPage: LinkToPage
}

const SimpleNav = ({linkToPage}: NavProps) => {
    return (
        <Link to={linkToPage.link as string}>{linkToPage.caption}</Link>
    );
}

const DropdownNav = ({linkToPage}: NavProps) => {
    const toggleDropDown = (e: React.MouseEvent) => {
        const closestDiv = (e.target as HTMLElement).closest("div");

        if(!closestDiv) return;

        closestDiv.classList.toggle("expanded");
        closestDiv.classList.toggle("closed");
    }

    return (
        <div className="dropdown closed">
            {/*<FontAwesomeIcon icon="fa-regular fa-angle-down" />*/}
            <a href="#"
               onClick={(e) => toggleDropDown(e)}
            >{linkToPage.caption}</a>
            <ul className="dropdown-content">
                {(linkToPage.link as []).map((subLink: LinkToPage) =>
                    <li key={subLink.link as string}>
                        <Link to={subLink.link as string}
                              onClick={(e) => toggleDropDown(e)}
                        >{subLink.caption}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default MainNavigation;

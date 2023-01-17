import React from 'react';
import {Link} from "react-router-dom";
import {LinkToPage, navigation} from "../../router/routes";

const MainNavigation = () => {
    return (
        <nav>
            <table>
                <tbody>
                <tr>
                    {navigation.map((linkToPage: LinkToPage) =>
                        <td key={linkToPage.caption}>
                            {Array.isArray(linkToPage.link) ?
                                <DropdownNav linkToPage={linkToPage}/> :
                                <SimpleNav linkToPage={linkToPage}/>
                            }
                        </td>
                    )}
                </tr>
                </tbody>
            </table>
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
    const toggle = () => {
        //TODO !!!!!!!!!!!!!!!!!!!!!
    }

    return (
        <>
            <a href="#" onClick={toggle}>{linkToPage.caption}</a>
            <ul className="dropdown">
                {(linkToPage.link as []).map((subLink: LinkToPage) =>
                    <li key={subLink.link as string}>
                        <Link to={subLink.link as string}>{subLink.caption}</Link>
                    </li>
                )}
            </ul>
        </>
    );
}

export default MainNavigation;

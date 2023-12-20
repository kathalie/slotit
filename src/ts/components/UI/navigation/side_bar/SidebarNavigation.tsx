import React, {useEffect, useState} from "react";
import SidebarLink from "./SidebarLink";
import {navigation} from "../../../../router/routes";
import {concatClassNames} from "../../../../utils/concatClassNames";
import {useLocation} from "react-router";

const SidebarNavigation = ({className}: { className?: string }) => {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setSideBarOpen(false);
    }, [location]);

    const toggleSidebar = () => setSideBarOpen(!sideBarOpen);

    return (
        <div className={concatClassNames("SidebarNavigation", className)}>
            <div className={"SideBarHeader"}>
                <button className={"burger-button"} onClick={toggleSidebar}>
                    {/*Three dots*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                         className="burger-icon" viewBox="0 0 40 40" preserveAspectRatio="meet">
                        <path
                            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                </button>
            </div>
            <aside className={"SidebarNav"} style={{right: sideBarOpen ? "0" : "-100%"}}>
                <button className={"close-button"} onClick={toggleSidebar}>
                    {/*Cross*/}
                    <svg width="30" height="30" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="50" x2="50" y2="0" stroke-width="6" stroke="white"/>
                        <line x1="0" y1="0" x2="50" y2="50" stroke-width="6" stroke="white"/>
                    </svg>
                </button>
                <nav className={"navigation"}>
                    {
                        navigation.map((item, index) =>
                            <SidebarLink link={item} key={index}/>
                        )
                    }
                </nav>
            </aside>
        </div>
    );
};

export default SidebarNavigation;

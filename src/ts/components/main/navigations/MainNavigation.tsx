import React, {useEffect, useState} from 'react';
import InlineNavigation from "../../UI/navigation/InlineNavigation";
import SidebarNavigation from "../../UI/navigation/side_bar/SidebarNavigation";

const MainNavigation = () => {
    const checkMobile = () => window.innerWidth < 900;

    const [isMobile, setIsMobile] = useState(checkMobile())

    const handleResize = () => {
        if (checkMobile()) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    return (
        <>
            {
                isMobile ?
                    <SidebarNavigation className={"MainNavigation"}/> :
                    <InlineNavigation className={"MainNavigation"}/>
            }
        </>
)
    ;
};


export default MainNavigation;

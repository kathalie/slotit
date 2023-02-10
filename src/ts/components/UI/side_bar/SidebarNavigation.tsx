import React, {useState} from "react";
import Logo from "../Logo";
import SidebarLink from "./SidebarLink";
import {navigation} from "../../../router/routes";

// const SideBarHeader = styled.div`
//   background: #15171c;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const SidebarNav = styled.nav`
//   background: #15171c;
//   width: 250px;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
//   transition: 350ms;
//   z-index: 10;
// `;

// const SidebarWrap = styled.div`
//   width: 100%;
// `;


const SidebarNavigation = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const toggleSidebar = () => setSideBarOpen(!sideBarOpen);

    return (
        <div className={"SideBar"}>
            <header className={"SideBarHeader"}>
                <Logo/>
                <button onClick={toggleSidebar}>Open</button>
            </header>
            <aside className={"SidebarNav"} style={{right: sideBarOpen ? "0" : "-100%"}}>
                <button onClick={toggleSidebar}>Close</button>
                {
                    navigation.map((item, index) =>
                        <SidebarLink link={item} key={index}/>
                    )
                }
            </aside>
        </div>
    );
};

export default SidebarNavigation;

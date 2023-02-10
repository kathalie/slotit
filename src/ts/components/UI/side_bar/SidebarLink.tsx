import React from "react";
import {LinkToPage} from "../../../router/routes";
import {SimpleNav} from "../../main/navigations/MainNavigation";

// const SidebarLink = styled(Link)`
//   display: flex;
//   color: #e1e9fc;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
//   list-style: none;
//   height: 60px;
//   text-decoration: none;
//   font-size: 18px;
//
//   &:hover {
//     background: #252831;
//     border-left: 4px solid green;
//     cursor: pointer;
//   }
// `;

// const SidebarLabel = styled.span`
//   margin-left: 16px;
// `;

// const DropdownLink = styled(Link)`
//   background: #252831;
//   height: 60px;
//   padding-left: 3rem;
//   display: flex;
//   align-items: center;
//   text-decoration: none;
//   color: #f5f5f5;
//   font-size: 18px;
//
//   &:hover {
//     background: green;
//     cursor: pointer;
//   }
// `;

const SidebarLink = ({ link }: {link: LinkToPage}) => {
    return (
        <div className={"SidebarLink"}>
            {
                Array.isArray(link.link) ?
                    <details>
                        <summary>{link.caption}</summary>
                        {
                            link.link.map(subLink =>
                                <SimpleNav linkToPage={subLink} key={subLink.caption}/>
                            )
                        }
                    </details> :
                    <SimpleNav linkToPage={link}/>
            }
        </div>
    );
};

export default SidebarLink;

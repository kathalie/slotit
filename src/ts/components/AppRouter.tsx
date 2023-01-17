import React from 'react';

import {Route, Routes} from 'react-router-dom';
import {allLinksToPages, LinkToPage} from "../router/routes";
import MainNavigation from "./UI/MainNavigation";

const AppRouter = () => {
    return (
        <div>
            <MainNavigation/>
            <Routes>
                {allLinksToPages.map(
                    (link: LinkToPage) => {
                        const component = link.component(link.params ?? {});
                        //console.log(link.link)
                        return (<Route path={link.link as string} element={component} key={link.link as string}/>);
                    }
                )}
            </Routes>
        </div>
    );
};

export default AppRouter;

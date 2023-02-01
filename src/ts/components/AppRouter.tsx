import React from 'react';

import {Route, Routes} from 'react-router-dom';
import {allLinksToPages, LinkToPage} from "../router/routes";
import MainNavigation from "./UI/MainNavigation";

const AppRouter = () => {
    return (
        <div>
            <Routes>
                {allLinksToPages.map(
                    (link: LinkToPage) => {
                        return (<Route path={link.link as string} element={<link.component {...link.params}/>} key={link.link as string}/>);
                    }
                )}
            </Routes>
        </div>
    );
};

export default AppRouter;

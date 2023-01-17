import React, {ReactComponentElement} from 'react';

import {Route, Routes} from 'react-router-dom';
import {pages} from "../router/paths";
import MainNavigation from "./UI/MainNavigation";

type PageInfo = {
    link: string,
    component: (props?: any) => ReactComponentElement<any>,
    caption?: string,
}

const AppRouter = () => {
    return (
        <div>
            <MainNavigation/>
            <Routes>
                {/*{Object.values(pages).map(*/}
                {/*    particularPages =>*/}
                {/*        Object.values(particularPages).map((page: PageInfo) =>*/}
                {/*            <Route path={page.link} element={page.component()}/>*/}
                {/*        )*/}
                {/*)                */}
                {Object.values(pages.navLinks).map((page: PageInfo) =>
                    <Route path={page.link} element={page.component()} key={page.link}/>
                )};
                <Route path={pages.others.main.link} element={pages.others.main.component()}/>
            </Routes>
        </div>
    );
};

export default AppRouter;

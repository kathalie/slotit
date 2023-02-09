import React from 'react';

import Logo from "./UI/Logo";
import AppRouter from "./AppRouter";
import MainNavigation from "./main/navigations/MainNavigation";
import MainFooter from "./main/MainFooter";
import ScrollToTop from "./ScrollToTop";

function App() {
    return (
        <div className="App">
            <header className="MainHeader">
                <Logo/>
                <MainNavigation/>
            </header>
            <ScrollToTop />
            <AppRouter/>
            <MainFooter/>
        </div>
    );
}

export default App;

import React from 'react';
import Logo from "./components/UI/Logo";
import AppRouter from "./components/AppRouter";
import MainNavigation from "./components/UI/navigations/MainNavigation";
import MainFooter from "./components/MainFooter";

function App() {
    return (
        <div className="App">
            <header className="MainHeader">
                <Logo/>
                <MainNavigation/>
            </header>
            <AppRouter/>
            <MainFooter/>
        </div>
    );
}

export default App;

import React from 'react';
import Logo from "./components/UI/Logo";
import AppRouter from "./components/AppRouter";
import MainNavigation from "./components/UI/MainNavigation";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Logo/>
                <MainNavigation/>
            </header>
            <AppRouter/>
        </div>
    );
}

export default App;

import React from 'react';

import AppRouter from "./components/AppRouter";
import Logo from "./components/UI/Logo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo/>
        <AppRouter/>
      </header>
    </div>
  );
}

export default App;

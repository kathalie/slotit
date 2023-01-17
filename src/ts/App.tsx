import React from 'react';
import Logo from "./components/UI/Logo";
import AppRouter from "./components/AppRouter";

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

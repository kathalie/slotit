import React from 'react';
import ReactDOM from 'react-dom/client';
import "./css/normalize.css";
import "./css/app.css";
import App from './ts/components/App';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

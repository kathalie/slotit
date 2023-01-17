import React from 'react';
import ReactDOM from 'react-dom/client';
import "./css/index.css";
import App from './ts/App';
import {BrowserRouter} from "react-router-dom";
import {articlesService} from "./init";
import {APIQueryBuilder, articleFilters, sorts} from "./ts/API/APIQueryBuilder";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const qb = new APIQueryBuilder({_limit: 3, _page: 1});
qb.addSort(sorts.byDate("desc"));
qb.addFilter(articleFilters.byType("blog"));

const response = articlesService.getByQuery(qb).then();

console.log(response)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);

import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import {NewsService} from "../../../API/BaseService";
import {NewsFeed} from "../../feeds";

const NewsPage = () => {
    const [news, setNews] = useState([]);

    const [fetchProjects, areProjectsLoading, projectsError] = useFetching(async (page, limit) => {
        const response = await new NewsService().getPerPage(page, limit);
        setNews([...news, ...response.data as []]);
    });

    useEffect(() => {
        fetchProjects(1, 10);
    }, []);

    return (
        <div>
            <h1>Новини</h1>
            {projectsError &&
                <h1> Мяу :( ${projectsError}</h1>
            }
            {
                areProjectsLoading ?
                    <p>NEWS ARE LOADING</p> :
                    <NewsFeed items={news}/>
            }
        </div>
    );
};

export default NewsPage;

import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import {ProjectsService} from "../../../API/BaseService";
import {ProjectsFeed} from "../../feeds";
import Loader from "../../Loader";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);

    const [fetchProjects, areProjectsLoading, projectsError] = useFetching(async (page, limit) => {
        const response = await new ProjectsService().getPerPage(page, limit);
        setProjects([...projects, ...response.data as []]);
    });

    useEffect(() => {
        fetchProjects(1, 10);
    }, []);

    return (
        <div>
            <h1>Проекти</h1>
            {
                        areProjectsLoading ?
                            <Loader/> :
                            <ProjectsFeed items={projects}/>
            }
        </div>
    );
};

export default ProjectsPage;

import React from 'react';
import Loader from "./UI/Loader";

type ComponentOrLoaderProps = {
    isLoading: boolean,
    error: unknown,
    component: React.Component
}

const ComponentHandler:React.FC<ComponentOrLoaderProps> = ({isLoading, error, component}) => {
    if (error) return <h1>error</h1>;

    if (isLoading) return <Loader/>;

    return (component);
};

export default ComponentHandler;

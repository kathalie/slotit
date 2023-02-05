import React from 'react';
import Loader from "./UI/Loader";

type ComponentControllerProps = {
    isLoading: boolean,
    error: unknown,
    componentCreator: (props: any) => JSX.Element,
    props: any
}

const ComponentController: React.FC<ComponentControllerProps> = ({isLoading, error, componentCreator, props}) => {
    if (error) return (<h1>{`${error}`}</h1>);

    if (isLoading) return <Loader/>;

    return (componentCreator(props));
};

export default ComponentController;

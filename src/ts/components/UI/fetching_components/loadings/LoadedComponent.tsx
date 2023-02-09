import React from "react";

import Loader from "../../Loader";
import {ComponentCreator} from "../../../../types/basic.types";

const LoadedComponent = <P extends object>({componentCreator, fetchingHook}: {
    componentCreator: ComponentCreator<P>,
    fetchingHook: () => [boolean, unknown],
}) => {
    const [loading, error] = fetchingHook();

    return (
        <BaseLoadedComponent componentCreator={componentCreator} loading={loading} error={error}/>
    );
};

export default LoadedComponent;

export const BaseLoadedComponent = <P extends object>({componentCreator, loading, error}: {
    componentCreator: ComponentCreator<P>,
    loading: boolean,
    error: unknown
}) => {
    if (error) return (<h1>{`${error}`}</h1>);

    if (loading) return <Loader/>;

    return (componentCreator.creator(componentCreator.props));
};

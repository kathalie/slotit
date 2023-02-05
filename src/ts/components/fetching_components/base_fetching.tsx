import {HasId} from "../../types/models";
import ComponentController from "../ComponentController";
import React from "react";

export const FetchingComponent = <T extends HasId>({className, componentCreator, props, fetchingHook}: {
    className?: string
    componentCreator: (props: any) => JSX.Element,
    props: object,
    fetchingHook: () => [boolean, unknown]
}) => {
    const [loading, error] = fetchingHook();

    return (
        <ComponentController
            componentCreator={componentCreator}
            props={{...props, className}}
            error={error}
            isLoading={loading}
        />
    );
};

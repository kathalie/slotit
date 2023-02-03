import {HasId} from "../../types/models";
import ComponentController from "../ComponentController";
import React from "react";

export const FetchingComponent = <T extends HasId>({componentCreator, props, fetchingHook}: {
    componentCreator: (props: any) => JSX.Element,
    props: object,
    fetchingHook: () => [boolean, unknown]
}) => {
    const [loading, error] = fetchingHook();

    return (
        <ComponentController
            componentCreator={componentCreator}
            props={props}
            error={error}
            isLoading={loading}
        />
    );
};

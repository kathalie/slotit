import React from "react";
import {IQueryBuilder} from "../API/query_builder/IQueryBuilder";

export type Callback = (...args: any[]) => any;

export type ObjectValues<T> = T[keyof T];

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type UseQB<Q extends IQueryBuilder> = {
    qb: Q,
    setQb: SetState<Q>
};

export type ComponentCallback<P extends object> = (props: P) => JSX.Element;

export type ComponentCreator<P extends object> = {
    creator: ComponentCallback<P>,
    props: P,
}

export type JSXChildren = JSX.Element[] | JSX.Element;

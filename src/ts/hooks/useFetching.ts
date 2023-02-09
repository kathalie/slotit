import {useEffect, useState} from "react";
import {Callback} from "../types/basic.types";
import {IService} from "../API/services";
import {IQueryBuilder} from "../API/query_builder/APIQueryBuilder";
import {HasId} from "../types/models";

export const useFetch = <A extends any>(fetchingCallback: (...args: A[]) => any, deps?: any[], ...args: A[]): [boolean, unknown] => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetching = async (...args: A[]) => {
        try {
            setIsLoading(true)
            await fetchingCallback(...args);
        } catch (e) {
            setError(e as string);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetching(...args);
    }, deps ?? []);

    return [isLoading, error];
}

export const useFetchItems = <T extends HasId>(updateItems: Callback, service: IService<T>, qb: IQueryBuilder,
                                        deps: any[] = [], previousItems: T[] = []): [boolean, unknown] => {
    const fetchItems = async () => {
        const fetchedResponse = (await service.getByQuery(qb));

        const totalCount = (fetchedResponse.headers["x-total-count"] ?? -1) as number;
        qb.setTotalPages(Math.ceil(totalCount / qb.pagination._limit));

        updateItems( [...previousItems, ...fetchedResponse.data]);
    };

    return useFetch(fetchItems, deps ?? []);
};

export const useFetchItem = <T extends HasId>(id: number, setItem: Callback, service: IService<T>,
                                deps: any[] = []): [boolean, unknown] => {

    const fetchItem = async () => {
        setItem((await service.getById(id)).data);
    };

    return useFetch(fetchItem, deps ?? []);
}

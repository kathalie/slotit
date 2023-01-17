import {useEffect, useState} from "react";
import {Callback} from "../types/callback.type";
import {IService} from "../API/services";
import {APIQueryBuilder} from "../API/APIQueryBuilder";
import {HasId} from "../types/models";

const useFetching = (
    setIsLoading: Callback,
    setError: Callback,
    callback: Callback
): Callback => {
    return async (...args: any[]) => {
        try {
            setIsLoading(true)
            await callback(...args);
        } catch (e) {
            setError(e as string);
        } finally {
            setIsLoading(false);
        }
    };
};

const useBaseFetch  = (callback: Callback, deps?: any[]): [boolean, unknown] => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetching = useFetching(setIsLoading, setError, callback);

    useEffect(() => {
        fetching();
    }, deps ?? []);

    return [isLoading, error];
}

export const useFetchItems = <T extends HasId>(previousItems: T[], updateItems: Callback, service: IService<T>,
                                 queryBuilder: APIQueryBuilder, deps?: any[]): [boolean, unknown] => {

    const callback = async () => {
        const fetchedResponse = await service.getByQuery(queryBuilder);
        updateItems([...previousItems, ...fetchedResponse]);

        //await new Promise(resolve => setTimeout(resolve, 1000)); //TODO DELETE
    };

    return useBaseFetch(callback, deps);

};

export const useFetchItem = <T extends HasId>(id: number, setItem: Callback, service: IService<T>,
                                deps?: any[]): [boolean, unknown] => {

    const callback = async () => {
        setItem(await service.getById(id));

        //await new Promise(resolve => setTimeout(resolve, 1000)); //TODO DELETE
    };

    return useBaseFetch(callback, deps);
}

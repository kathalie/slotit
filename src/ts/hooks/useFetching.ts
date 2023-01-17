import {useState} from "react";
import {Callback} from "../types/callback.type";

export const useFetching = (callback: Callback): [Callback, boolean, string] => {
    // const [isLoading, setIsLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetching = async (...args: any[]) => {
        try {
            // setIsLoading(true)
            await callback(...args);
        } catch (e) {
            setError(e as string);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};

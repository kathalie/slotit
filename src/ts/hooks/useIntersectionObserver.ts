import {MutableRefObject, useEffect, useRef} from "react";
import {Callback} from "../types/callback.type";

export const useIntersectionObserver = (ref: MutableRefObject<Element | null>, canLoad: boolean, isLoading: boolean, callback: Callback) => {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(function(entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        });
        observer.current.observe(<Element>ref.current);
    }, [isLoading])
}

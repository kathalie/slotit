import React, {useMemo, useState} from 'react';
import {ComponentCallback, ObjectValues, SetState, UseQB} from "../../../types/basic.types";
import LoadedFeed from "../feeds/loaded_feeds/LoadedFeed";
import LazyLoadedFeed from "../feeds/loaded_feeds/LazyLoadedFeed";
import LoadedPaginationFeed from "../feeds/loaded_feeds/LoadedPaginationFeed";
import {FeedProps} from "../feeds/Feed";
import {IQueryBuilder} from "../../../API/query_builder/IQueryBuilder";

export const feedPagination: Record<string, {
    feedCreator: ComponentCallback<any>,
    append: boolean,
    feedNeedsQb: boolean,
    paginationNeedsQb: boolean
}> = {
    LAZY_LOADING: {
        // feedCreator: LazyLoadedFeed as ComponentCallback<ExtendedLoadedFeedProps>,
        feedCreator: LazyLoadedFeed,
        append: true,
        feedNeedsQb: false,
        paginationNeedsQb: true
    },
    PAGINATION: {
        // feedCreator: LoadedPaginationFeed as ComponentCallback<CommonLoadedFeedProps>,
        feedCreator: LoadedPaginationFeed,
        append: false,
        feedNeedsQb: true,
        paginationNeedsQb: false
    },
    NONE: {
        // feedCreator: LoadedFeed as ComponentCallback<CommonLoadedFeedProps>,
        feedCreator: LoadedFeed,
        append: false,
        feedNeedsQb: true,
        paginationNeedsQb: false
    },
}

export type FeedPagination = ObjectValues<typeof feedPagination>;

export type FetchingHookArgs<T extends object> = {
    qb: IQueryBuilder,
    prevItems: T[],
    setItems: SetState<T[]>
}

export type FetchedFeedProps<T extends object, Q extends IQueryBuilder> = {
    className?: string,
    useQb: UseQB<Q>,
    card: React.FC<{ item: T }>,
    fetchingHook: (args: FetchingHookArgs<T>) => [boolean, unknown],
    pagination: FeedPagination,
};

const FetchedFeed = <T extends object, Q extends IQueryBuilder>(props: FetchedFeedProps<T, Q>) => {
    const [items, setItems] = useState<T[]>([]);

    const memoizedItems = useMemo(() => {
        return items;
    }, [props.useQb.qb, items]);

    const append = props.pagination === feedPagination.LAZY_LOADING;

    const useFetchingHook = () => props.fetchingHook({
            qb: props.useQb.qb,
            prevItems: append ? memoizedItems : [] as T[],
            setItems
        }
    );

    const feedProps: FeedProps<T> & {useQb?: UseQB<Q>} = {
        ...{
            items: memoizedItems,
            functionalComponent: props.card,
            className: props.className,
        },
        ...((props.pagination.feedNeedsQb) ? {useQb: props.useQb} : {})
    };

    return (
        <props.pagination.feedCreator feedProps={feedProps}
                                      fetchingHook={useFetchingHook}
                                      {...(props.pagination.paginationNeedsQb ? {useQb: props.useQb} : {})}
        />
    );


    // if (props.pagination === feedPagination.LAZY_LOADING) return (
    //     <LazyLoading componentCreator={Feed}
    //                  props={commonProps}
    //                  fetchingHook={useFetchingHook}
    //                  useQb={props.useQb}
    //     />
    // );
    //
    // return (
    //     <LoadedComponent componentCreator={props.pagination === feedPagination.PAGINATION ? PaginationFeed : Feed}
    //                      props={{
    //                          ...commonProps,
    //                          qb: props.qb,
    //                          setQb: props.setQb
    //                      }}
    //                      fetchingHook={useFetchingHook}
    //     />
    // );
};

export default FetchedFeed;

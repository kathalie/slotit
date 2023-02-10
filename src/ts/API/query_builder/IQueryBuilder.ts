import {APIFilter, APIRange, APISort, PaginationProps, SortOrder} from "./queries/queries.types";

export interface IQueryBuilder {
    totalPages: number;
    pagination: PaginationProps;
    filters: APIFilter[];
    ranges: APIRange[];
    sorts: APISort[];
    searchQuery: string;
    lastUpdated: string;

    updated(): IQueryBuilder;

    itemsNeedRefreshing(): boolean;

    setTotalPages(totalPages: number): IQueryBuilder;

    setPage(page: number): IQueryBuilder;

    setLimit(limit: number): IQueryBuilder;

    setSearchQuery(query: string): IQueryBuilder;

    unsetSearchQuery(): IQueryBuilder;

    addFilter(filter: APIFilter): IQueryBuilder;

    removeFilter(filter: APIFilter): IQueryBuilder;

    removeAllFilters(): IQueryBuilder;

    setFilter(filter: APIFilter): IQueryBuilder;

    addSort(sort: APISort): IQueryBuilder;

    setSort(sort: APISort): IQueryBuilder;

    removeSort(sort: APISort): IQueryBuilder;

    removeAllSorts(): IQueryBuilder;

    addRange(range: APIRange): IQueryBuilder;

    removeRange(range: APIRange): IQueryBuilder;

    getFilterValue(filter: APIFilter): string | undefined;

    getSortOrder(sort: APISort): SortOrder | undefined;

    getQueryParams(): object;
}

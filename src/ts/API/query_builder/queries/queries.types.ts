export type PaginationProps = {
    _page: number,
    _limit: number
}
export type SortOrder = "asc" | "desc";

export type SortProps = {
    _sort: string,
    _order: SortOrder
};
export type FilterProps = {
    field: string,
    value: any
};
export type RangeProps = {
    field: string,
    _gte?: number,
    _lte?: number
}
export type Queries = {
    filters: FilterProps[],
    sorts: SortProps[]
}
export type APIFilter = () => FilterProps;
export type APISort = () => SortProps;
export type APIRange = () => RangeProps;

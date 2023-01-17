import {ArticleType} from "../types/models";

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

export type Queries = {
    filters: FilterProps[],
    sorts: SortProps[]
}

export type APIFilter = () => FilterProps;
export type APISort = () => SortProps;

export class APIQueryBuilder {
    private filters: APIFilter[] = [];
    private sorts: APISort[] = [];

    constructor(private pagination: PaginationProps) {
    }

    private add<F extends CallableFunction>(what: F, where: F[]): APIQueryBuilder {
        where.push(what);

        return this;
    }

    private remove<F extends CallableFunction>(what: F, where: F[]): APIQueryBuilder {
        const index = where.findIndex(p => p.name === what.name);

        if (index !== -1) where.splice(index, 1);

        return this;
    }

    public addFilter(filter: APIFilter): APIQueryBuilder {
        return this.add(filter, this.filters);
    }

    public removeFilter(filter: APIFilter): APIQueryBuilder {
        return this.remove(filter, this.filters);
    }

    public addSort(sort: APISort): APIQueryBuilder {
        return this.add(sort, this.sorts);
    }

    public removeSort(sort: APISort): APIQueryBuilder {
        return this.remove(sort, this.sorts);
    }

    public getQueryParams(): object {
        let params: any = {
            _page: this.pagination._page,
            _limit: this.pagination._limit,
        }

        if (this.sorts.length > 0) {
            params._sort = this.sorts.map(sort => sort()._sort).join(",");
            params._order = this.sorts.map(sort => sort()._order).join(",");
        }

        if (this.filters.length > 0) {
            this.filters.forEach(filter => params[filter().field] = filter().value);
        }

        return params;
    }
}


export const articleFilters = {
    byType: (value: ArticleType): APIFilter => function typeFilter() {
        return {field: "type", value: value};
    }
}

export const articleSorts = {
    byType: (order: SortOrder): APISort => function topicSort() {
        return {_sort: "type", _order: order};
    },
    byTitle: (order: SortOrder): APISort => function topicSort() {
        return {_sort: "title", _order: order};
    },
    byDate: (order: SortOrder): APISort => function topicSort() {
        return {_sort: "date", _order: order};
    }
}

import {APIFilter, APIRange, APISort, PaginationProps, SortOrder} from "./queries/queries.types";
import {IQueryBuilder} from "./IQueryBuilder";

export class JSONServerQueryBuilder implements IQueryBuilder {
    public totalPages: number = -1;
    public pagination: PaginationProps = {_page: 1, _limit: -1};
    public filters: APIFilter[] = [];
    public ranges: APIRange[] = [];
    public sorts: APISort[] = [];
    public searchQuery: string = "";
    public lastUpdated: string = "";

    constructor(qb?: JSONServerQueryBuilder) {
        if (qb) Object.assign(this, qb);

        return this;
    }

    public itemsNeedRefreshing(): boolean {
        return !["", "page", "limit"].includes(this.lastUpdated);
    }

    public updated(): JSONServerQueryBuilder {
        return new JSONServerQueryBuilder(this);
    }

    private set<T>(what: T, how: (what: T) => void): JSONServerQueryBuilder {
        how(what);

        return this;
    }

    private add<F extends CallableFunction>(what: F, where: F[]): JSONServerQueryBuilder {
        where.push(what);

        return this;
    }

    private remove<F extends CallableFunction>(what: F, where: F[]): JSONServerQueryBuilder {
        const index = where.findIndex(p => p.name === what.name);

        if (index !== -1) where.splice(index, 1);

        return this;
    }

    public setTotalPages(totalPages: number): JSONServerQueryBuilder {
        return this.set(totalPages, (n) => this.totalPages = n);
    }

    public setPage(page: number): JSONServerQueryBuilder {
        this.lastUpdated = "page";

        return this.set(page, (_page) => this.pagination._page = _page);
    }

    public setLimit(limit: number): JSONServerQueryBuilder {
        this.lastUpdated = "limit";

        return this.set(limit, (_limit) => this.pagination._limit = _limit);
    }

    public setSearchQuery(query: string): JSONServerQueryBuilder {
        this.lastUpdated = "search";

        return this.set(query, (_query) => this.searchQuery = _query);
    }

    public unsetSearchQuery(): JSONServerQueryBuilder {
        return this.set("", (_query) => this.searchQuery = _query);
    }

    public addFilter(filter: APIFilter): JSONServerQueryBuilder {
        this.lastUpdated = "filter";

        return this.add(filter, this.filters);
    }

    public removeFilter(filter: APIFilter): JSONServerQueryBuilder {
        return this.remove(filter, this.filters);
    }

    public removeAllFilters(): JSONServerQueryBuilder {
        this.filters = [];

        return this;
    }

    public setFilter(filter: APIFilter): JSONServerQueryBuilder {
        return this.removeAllFilters().addFilter(filter);
    }

    public addSort(sort: APISort): JSONServerQueryBuilder {
        this.lastUpdated = "sort";

        return this.add(sort, this.sorts);
    }

    public removeSort(sort: APISort): JSONServerQueryBuilder {
        return this.remove(sort, this.sorts);
    }

    public removeAllSorts(): JSONServerQueryBuilder {
        this.sorts = [];

        return this;
    }

    public setSort(sort: APISort): JSONServerQueryBuilder {
        return this.removeAllSorts().addSort(sort);
    }

    public addRange(range: APIRange): JSONServerQueryBuilder {
        this.lastUpdated = "range";

        return this.add(range, this.ranges);
    }

    public removeRange(range: APIRange): JSONServerQueryBuilder {
        return this.remove(range, this.ranges);
    }

    public getFilterValue(filter: APIFilter): string | undefined {
        return this.filters.find(f => f.name === filter.name)?.().value;
    }

    public getSortOrder(sort: APISort): SortOrder | undefined {
        return this.sorts.find(f => f.name === sort.name)?.()._order;
    }

    public getQueryParams(): object {
        const params: any = {
            _limit: this.pagination._limit,
            _page: this.pagination._page
        }

        if (this.sorts.length > 0) {
            params._sort = this.sorts.map(sort => sort()._sort).join(",");
            params._order = this.sorts.map(sort => sort()._order).join(",");
        }

        if (this.filters.length > 0) {
            this.filters.forEach(filter => {
                    const key = filter().field;

                    if (!params[key]) params[filter().field] = [filter().value];
                    else params[filter().field] = Array.of(...params[filter().field], filter().value)
                }
            );
        }

        if (this.ranges.length > 0) {
            this.ranges.forEach(range => {
                const objRange = range();

                if (objRange._gte) params[`${objRange.field}_gte`] = objRange._gte;
                if (objRange._lte) params[`${objRange.field}_lte`] = objRange._lte;
            });
        }

        if (this.searchQuery) params.q = this.searchQuery;

        return params;
    }
}



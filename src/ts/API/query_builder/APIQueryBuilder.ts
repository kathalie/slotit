import {APIFilter, APIRange, APISort, PaginationProps} from "./queries.types";

export interface IQueryBuilder {
    setPage(page: number): IQueryBuilder;
    setLimit(limit: number): IQueryBuilder;
    addFilter(filter: APIFilter): IQueryBuilder;
    removeFilter(filter: APIFilter): IQueryBuilder;
    addSort(sort: APISort): IQueryBuilder;
    removeSort(sort: APISort): IQueryBuilder;
    addRange(range: APIRange): IQueryBuilder;
    removeRange(range: APIRange): IQueryBuilder;
    getQueryParams(): object;
}

export class APIQueryBuilder implements IQueryBuilder{
    public pagination: PaginationProps = {_page: 1, _limit: 10};
    public filters: APIFilter[] = [];
    public ranges: APIRange[] = [];
    public sorts: APISort[] = [];

    constructor() {
        return this;
    }

    public setPage(page: number): APIQueryBuilder {
        this.pagination._page = page;

        return this;
    }

    public setLimit(limit: number): APIQueryBuilder {
        this.pagination._limit = limit;

        return this;
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

    public addRange(range: APIRange): APIQueryBuilder {
        return this.add(range, this.ranges);
    }

    public removeRange(range: APIRange): APIQueryBuilder {
        return this.remove(range, this.ranges);
    }

    public getQueryParams(): object {
        const params: any = {
            _limit: this.pagination._limit,
        }

        if (this.sorts.length > 0) {
            params._sort = this.sorts.map(sort => sort()._sort).join(",");
            params._order = this.sorts.map(sort => sort()._order).join(",");
        }

        if (this.filters.length > 0) {
            this.filters.forEach(filter => params[filter().field] = filter().value);
        }

        if (this.ranges.length > 0) {
            this.ranges.forEach(range => {
                const objRange = range();

                if (objRange._gte) params[`${objRange.field}_gte`] = objRange._gte;
                if (objRange._lte) params[`${objRange.field}_lte`] = objRange._lte;
            });
        }

        return params;
    }
}



import React from 'react';
import {UseQB} from "../../types/basic.types";
import {IQueryBuilder} from "../../API/query_builder/IQueryBuilder";
import {APIFilter} from "../../API/query_builder/queries/queries.types";
import {concatClassNames} from "../../utils/concatClassNames";

export type FilterOption = string | "all";
export type FilterOptions = Record<FilterOption, string>;
export type ParticularFilter = {
    filter: (value: any) => APIFilter,
    caption: string,
    filterOptions: FilterOptions
}

const Filter = <Q extends IQueryBuilder>({useQb, particularFilter, className}:{
    useQb: UseQB<Q>,
    particularFilter: ParticularFilter,
    className?: string
}) => {
    const setTypeFilter = (value: FilterOption) => {
        useQb.qb.removeFilter(particularFilter.filter(value));

        useQb.setQb(
            (value !== "all" ?
                useQb.qb.addFilter(particularFilter.filter(value)) :
                useQb.qb)
            .updated() as Q
        );
    }

    return (
            <label className={concatClassNames("Filter", className)}>
                {particularFilter.caption}
                <select
                    onChange={(e => setTypeFilter(e.target.value as FilterOption))}
                    value={useQb.qb.filters.length > 0 ? useQb.qb.filters[0]().value : "all"}
                >
                    {
                        Object.entries(particularFilter.filterOptions).map(filterValue =>
                            <option
                                value={filterValue[0]}
                                key={filterValue[0]}
                            >
                                {filterValue[1]}
                            </option>
                        )
                    }
                </select>
            </label>
    );
};

export default Filter;

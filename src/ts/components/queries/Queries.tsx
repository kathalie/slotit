import React from 'react';
import {IQueryBuilder} from "../../API/query_builder/IQueryBuilder";
import {UseQB} from "../../types/basic.types";
import SortBlock, {ParticularSort} from "./SortBlock";
import Filter, {ParticularFilter} from "./Filter";
import Search from "./Search";

export type ParticularQueries = {
    sorts?: ParticularSort[],
    filters?: ParticularFilter[],
    search: boolean
}

const Queries = <Q extends IQueryBuilder>({useQb, queries}: {
    useQb: UseQB<Q>,
    queries: ParticularQueries
}) => {

    return (
        <div className="Queries">
            {
                queries.search &&
                <Search useQb={useQb}/>
            }
            {
                queries.sorts &&
                <SortBlock useQb={useQb} particularSorts={queries.sorts}/>
            }
            {
                queries.filters &&
                <div className={"Filters"}>
                    {
                        queries.filters.map(particularFilter =>
                            <Filter useQb={useQb} particularFilter={particularFilter} key={particularFilter.caption}/>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default Queries;

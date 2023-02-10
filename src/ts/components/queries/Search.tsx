import React from 'react';
import {IQueryBuilder} from "../../API/query_builder/IQueryBuilder";
import {UseQB} from "../../types/basic.types";
import {concatClassNames} from "../../utils/concatClassNames";

const Search = <Q extends IQueryBuilder>({useQb, className}: {
    useQb: UseQB<Q>,
    className?: string
}) => {
    const handleInputChange = (query: string) => {
        useQb.setQb(useQb.qb
            .setPage(1)
            .setSearchQuery(query)
            .updated() as Q
        );
    }

    return (
        <input className={concatClassNames("Search", className)}
               type="search"
               value={useQb.qb.searchQuery}
               onChange={e => handleInputChange(e.target.value as string)}
               placeholder="Пошук..."/>
    );
};

export default Search;

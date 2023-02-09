import React from 'react';
import {PostType, postTypeCaptions} from "../../types/models";
import {filters} from "../../API/query_builder/queries/API_queries";
import {Callback} from "../../types/basic.types";
import Sort from "./Sort";
import {IQueryBuilder} from "../../API/query_builder/IQueryBuilder";

const Filters = ({qb, setQb}:{
    qb: IQueryBuilder,
    setQb: Callback
}) => {
    type PostFilterProps = PostType | "all";

    function setTypeFilter(value: PostFilterProps) {
        qb.removeFilter(filters.postFilters.byType(value));

        setQb(value !== "all" ?
            qb.addFilter(filters.postFilters.byType(value)).updated() :
            qb.updated());
    }

    return (
        <div className="queries">
            {/*<input type="text"*/}
            {/*       value={filter.query}*/}
            {/*       onChange={e => setFilter({...filter, query: e.target.value})}*/}
            {/*       placeholder="Пошук..."/>*/}
            <label className="filters">
                Тип постів:
                <select
                    name="filter"
                    id="posts_filter"
                    onChange={(e => setTypeFilter(e.target.value as PostFilterProps))}
                    value={qb.filters.length > 0 ? qb.filters[0]().value : "all"}
                >
                    {
                        Object.entries(postTypeCaptions).map(type =>
                            <option
                                value={type[0]}
                                key={type[0]}
                            >{type[1]}</option>
                        )
                    }
                </select>
            </label>
            <label className="sorts">
                Сортувати за:
                <Sort qb={qb} setQb={setQb}/>
            </label>
        </div>
    );
};

export default Filters;

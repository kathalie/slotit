import React from 'react';
import {Callback} from "../types/callback.type";
import {SortsProps} from "../API/services";

type QueriesProps = {
    queries: {
        filter: string,
        sort: SortsProps
    },
    setQueries: Callback
}

const Queries: React.FC<QueriesProps> = ({queries, setQueries}) => {
    // const addSortingFields = (sort: SortsProps) => {
    //     setQueries({
    //         filter: queries.filter,
    //         sort: {
    //             _sort: [...queries.sort._sort, sort._sort],
    //             _order: [...queries.sort._order, sort._order],
    //         }
    //     });
    // }
    //
    // const removeSort = (sort: SortsProps) => {
    //     setQueries({
    //         filter: queries.filter,
    //         sort: {
    //             _sort: [...queries.sort._sort, ]
    //         }
    //     });
    // }


    return (
        <div>
            {/*<input type="text"*/}
            {/*       value={filter.query}*/}
            {/*       onChange={e => setFilter({...filter, query: e.target.value})}*/}
            {/*       placeholder="Поиск..."/>*/}
            <label>
                Тип статей:
                <select name="filter" id="articles_filter">
                    <option value="all">Всі</option>
                    <option value="blog">Наш блог</option>
                    <option value="translation">Переклади статей</option>
                </select>
            </label>
            <label>
                Сортувати за:
                <div id="articles_sort">
                    <button data-value="date" data-order="">Датою</button>
                    <button data-value="title" data-order="">Назвою</button>
                    <button data-value="type" data-order="">Типом</button>
                </div>
            </label>

        </div>
    );
};

export default Queries;

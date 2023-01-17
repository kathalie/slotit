import React from 'react';
import {Callback} from "../types/callback.type";
import {Queries} from "../API/APIQueryBuilder";

type QueriesProps = {
    queries: Queries,
    setQueries: Callback
}

const Filters: React.FC<QueriesProps> = ({queries, setQueries}) => {
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

export default Filters;

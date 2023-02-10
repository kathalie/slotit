import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {News, Post} from "../../../types/models";
import {formattedDate} from "../../../utils/date";
import FetchedById from "../../UI/fetching_components/FetchedById";
import {ItemType} from "../../../types/item.types";

const IdNewsPage = () => {
    const {id} = useParams<{ id: string }>();
    const numberId: number = parseInt(id ?? "");

    const cardCreator = ({item}: { item: News }) => (
        <div>
            <header>
                <p>{formattedDate(item.date)}</p>
                <h1>{item.title}</h1>
            </header>
            <div className="content">{item.content}</div>
        </div>
    );

    return (
        <div className={"IdNewsPage"}>
            {
                numberId === Number.NaN ?
                    <p>Новину не знайдено</p> :
                    <FetchedById itemType={ItemType.News}
                                 cardCreator={cardCreator}
                                 id={numberId}/>
            }
        </div>
    );
};
export default IdNewsPage;

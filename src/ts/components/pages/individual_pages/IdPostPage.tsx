import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Post} from "../../../types/models";
import FetchedById from "../../UI/fetching_components/FetchedById";
import {ItemType} from "../../../types/item.types";
import {PostCard} from "../../cards/PostCard";
import {formattedDate} from "../../../utils/date";
import FetchedFeed, {feedPagination, FetchingHookArgs} from "../../UI/fetching_components/FetchedFeed";
import {JSONServerQueryBuilder} from "../../../API/query_builder/JSONServerQueryBuilder";
import {postsService} from "../../../../init";
import {useFetch} from "../../../hooks/useFetching";
import {filters} from "../../../API/query_builder/queries/API_queries";

const IdPostPage = () => {
    const {id} = useParams<{ id: string }>();
    const [currentId, setCurrentId] = useState(id);

    useEffect(() => {
        setCurrentId(id);

    }, [id]);

    const numberId: number = parseInt(currentId ?? "");

    const cardCreator = ({item}: { item: Post }) => (
        <div>
            <header>
                <p>{formattedDate(item.date)}</p>
                <h1>{item.title}</h1>
            </header>
            <img src={item.largePicture} alt={`Picture for post with title ${item.title}`}/>
            <div className="content">{item.content}</div>
        </div>
    );

    return (
        <div className={"IdPostPage"}>
            {
                numberId === Number.NaN ?
                    <p>Пост не знайдено</p> :
                    <FetchedById itemType={ItemType.Post}
                                 cardCreator={cardCreator}
                                 id={numberId}/>
            }
            <h1>Перегляньте також інші пости!</h1>
            <FetchedOtherPosts thisPostId={numberId}/>
        </div>
    );
};

export default IdPostPage;

const FetchedOtherPosts = ({thisPostId}: {thisPostId: number}) => {
    const [qb, setQb] = useState(new JSONServerQueryBuilder()
        .setPage(1)
        .setLimit(2));

    return (
        <FetchedFeed useQb={{qb, setQb}}
                     card={PostCard}
                     fetchingHook={useFetchOtherPosts(thisPostId)}
                     pagination={feedPagination.NONE}/>
    )
}

export const useFetchOtherPosts = (id: number) =>
    function useInner({qb, prevItems, setItems}: FetchingHookArgs<Post>) {
        const fetchOtherPosts = async () => {
            const postsResponse = await postsService.getByQuery(qb); // waiting for the total count
            const totalCount = (postsResponse.headers["x-total-count"] ?? -1) as number;

            const before = id - 1 < 0 ? id + 2 : id - 1;
            const after = id + 1 > totalCount ? id - 2 : id + 1;

            const otherPostIds = [before, after];

            otherPostIds.forEach(id => qb.addFilter(filters.byId(id)));

            setItems((await postsService.getByQuery(qb)).data);
        }

        return useFetch(fetchOtherPosts);
    }

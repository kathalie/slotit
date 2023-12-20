import React, {useState} from 'react';
import {APISort, SortOrder} from "../../API/query_builder/queries/queries.types";
import {UseQB} from "../../types/basic.types";
import {IQueryBuilder} from "../../API/query_builder/IQueryBuilder";
import SortButton from "./SortingButton";
import {concatClassNames} from "../../utils/concatClassNames";

type SortLambda = (order: SortOrder) => APISort;

export type ParticularSort = {
    caption: string, sort: SortLambda
}

const SortBlock = <Q extends IQueryBuilder>({useQb, particularSorts, className}: {
    useQb: UseQB<Q>,
    particularSorts: ParticularSort[],
    className?: string
}) => {
    const [prevSort, setPrevSort] = useState<SortLambda>((_: SortOrder) => useQb.qb.sorts[0]);
    const [order, setOrder] = useState<SortOrder>(useQb.qb.sorts[0]()._order);

    const handleSort = (sort: SortLambda) => {
        if (sort !== prevSort) setPrevSort(sort);

        const newOrder = order === 'asc' ? 'desc' : 'asc';

        setOrder(newOrder);

        useQb.setQb(useQb.qb.setPage(1).setSort(sort(newOrder)).updated() as Q);
    }

    return (
        <div className={concatClassNames("SortBlock", className)}>
            Сортувати за:
            {
                particularSorts.map((sortParameter) =>
                    <SortButton
                        order={prevSort.name === sortParameter.sort(order).name ? order : ""}
                        onClick={() => handleSort(sortParameter.sort)}
                        key={sortParameter.sort.name}
                    >
                        {sortParameter.caption}
                    </SortButton>
                )
            }
        </div>
    );
};

export default SortBlock;

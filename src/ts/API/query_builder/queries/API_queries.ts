import {PostType} from "../../../types/models";
import {APIFilter, APIRange, APISort, SortOrder} from "./queries.types";

export const filters = {
    postFilters: {
        byType: (postType: PostType | "all"): APIFilter => function typeFilter() {
            return {field: "type", value: postType};
        }
    },
    newsFilters: {
        byProject: (projectId: number): APIFilter => function projectIdFilter() {
            return {field: "projectId", value: projectId};
        }
    },
    projectFilters: {
        byProcess: (inProcess: boolean): APIFilter => function processFilter() {
            return {field: "inProcess", value: inProcess};
        }
    },
    byId: (id: number): APIFilter => function idFilter() {
        return {field: "id", value: id};
    }
}

export const ranges = {
    byDate: (from: Date, to: Date, field: string): APIRange => function dateRange() {
        return {field: field, _gte: from.getMilliseconds(), _lte: to.getMilliseconds()}
    }
}

export const sorts = {
    byTitle: (order: SortOrder): APISort => function titleSort() {
        return {_sort: "title", _order: order};
    },
    byDate: (order: SortOrder): APISort => function dateSort() {
        return {_sort: "date", _order: order};
    }
}

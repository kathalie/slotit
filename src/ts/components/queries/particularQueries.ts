import {FilterOptions, ParticularFilter} from "./Filter";
import {filters, sorts} from "../../API/query_builder/queries/API_queries";
import {ParticularSort} from "./SortBlock";

export const postTypeOptions: FilterOptions = {
    all: "Всі",
    blog: "Наш блог",
    translation: "Переклади статей українською",
}

export const sortParameters: Record<string, ParticularSort> = {
    date: {caption: "Датою", sort: sorts.byDate},
    title: {caption: "Назвою", sort: sorts.byTitle},
    project: {caption: "Проектом", sort: sorts.newsSorts.byProject}
};




export const uiFilters: Record<string, Record<string, ParticularFilter>> = {
    post: {
        type: {
            filter: filters.postFilters.byType,
            caption: "За типом",
            filterOptions: postTypeOptions
        }
    }
}

export const uiSorts: Record<string, ParticularSort> = {
    date: {sort: sorts.byDate, caption: "За датою"},
    title: {sort: sorts.byTitle, caption: "За назвою"},
    newsProject: {sort: sorts.newsSorts.byProject, caption: "За проєктом"}
}

import {FetchingHookArgs} from "./FetchedFeed";
import {newsService, postsService, projectsService} from "../../../../init";
import {News, Post, Project} from "../../../types/models";
import {JSONServerQueryBuilder} from "../../../API/query_builder/JSONServerQueryBuilder";
import {filters} from "../../../API/query_builder/queries/API_queries";
import {useFetch, useFetchItems} from "../../../hooks/useFetching";
import {NewsAndProject} from "./itemCardsCreators";

export const useFetchNews = (withProjects: boolean) =>
    function useInner({qb, prevItems, setItems}: FetchingHookArgs<NewsAndProject>) {
        const fetchNews = async () => {
            const newsResponse = (await newsService.getByQuery(qb));
            const fetchedNews: News[] = newsResponse.data;

            let newItems;

            if (withProjects) {
                const projectIds = new Set<number>(fetchedNews.map(news => news.projectId));

                const projectsQb = new JSONServerQueryBuilder().setLimit(qb.pagination._limit);
                projectIds.forEach(projectId => projectsQb.addFilter(filters.byId(projectId)));

                const fetchedProjects = (await projectsService.getByQuery(projectsQb)).data;

                newItems = fetchedNews.map(news => {
                    return {
                        id: news.id,
                        news,
                        project: fetchedProjects.find(project => project.id === news.projectId) as Project
                    };
                });
            } else {
                newItems = fetchedNews.map(news => {
                    return {
                        id: news.id,
                        news: news
                    };
                });
            }

            const totalCount = (newsResponse.headers["x-total-count"] ?? -1) as number;
            qb.setTotalPages(Math.ceil(totalCount / qb.pagination._limit));

            setItems(prevItems.concat(newItems));
        }

        return useFetch(fetchNews, [qb]);
    }

export const useFetchPosts = ({qb, prevItems, setItems}: FetchingHookArgs<Post>) =>
    useFetchItems<Post>(setItems, postsService, qb, [qb], prevItems);

export const useFetchProjects = ({qb, prevItems, setItems}: FetchingHookArgs<Project>) =>
    useFetchItems<Project>(setItems, projectsService, qb, [qb], prevItems);

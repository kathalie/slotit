import {FetchingHookArgs} from "./FetchedFeed";
import {newsService, postsService, projectsService} from "../../../../init";
import {News, Post, Project} from "../../../types/models";
import {APIQueryBuilder} from "../../../API/query_builder/APIQueryBuilder";
import {filters} from "../../../API/query_builder/queries/API_queries";
import {useFetch, useFetchItems} from "../../../hooks/useFetching";
import {NewsAndProject} from "./itemCardsCreators";

export const useFetchNews = (withProjects: boolean) =>
    function useInnerFetchNews({qb, prevItems, setItems}: FetchingHookArgs<NewsAndProject>) {
        const fetchNews = async () => {
            const newsResponse = (await newsService.getByQuery(qb));
            const fetchedNews: News[] = newsResponse.data;

            let newItems;

            if (withProjects) {
                const projectIds = new Set<number>(fetchedNews.map(news => news.projectId));

                const projectsQb = new APIQueryBuilder().setLimit(qb.pagination._limit);
                projectIds.forEach(projectId => projectsQb.addFilter(filters.byId(projectId)));

                const fetchedProjects = (await projectsService.getByQuery(projectsQb)).data;

                newItems = fetchedNews.map(news => {
                    return {
                        news,
                        project: fetchedProjects.find(project => project.id === news.projectId) as Project
                    };
                });
            } else {
                newItems = fetchedNews.map(news => {
                    return {
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

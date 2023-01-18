import NewsPage from "../components/pages/group_pages/NewsPage";
import PostsPage from "../components/pages/group_pages/PostsPage";
import AboutUsPage from "../components/pages/AboutUsPage";
import ProjectsPage from "../components/pages/group_pages/ProjectsPage";
import IdProjectPage from "../components/pages/individual_pages/IdProjectPage";
import MainPage from "../components/pages/MainPage";
import IdNewsPage from "../components/pages/individual_pages/IdNewsPage";
import IdPostPage from "../components/pages/individual_pages/IdArticlePage";
import {filters} from "../API/query_builder/API_queries";

export type LinkToPage = {
    link: string | LinkToPage[],
    component: (params?: any) => JSX.Element,
    params?: any,
    caption?: string,
}

export const dropdown: LinkToPage[] = [
    {
        link: "/posts/blog",
        component: PostsPage,
        params: filters.postFilters.byType("blog"),
        caption: "Наш блог"
    },
    {
        link: "/posts/translations",
        component: PostsPage,
        params: filters.postFilters.byType("translation"),
        caption: "Переклади статей українською"
    },
]

export const navigation: LinkToPage[] = [
    {link: "/", component: MainPage, caption: "Головна"},
    {link: "/news", component: NewsPage, caption: "Новини"},
    {link: Object.values(dropdown), component: PostsPage, caption: "Пости"},
    {link: "/projects", component: ProjectsPage, caption: "Проекти"},
    {link: "/about_us", component: AboutUsPage, caption: "Про нас"},
]

export const idPages: LinkToPage[] = [
    {link: "/projects/:id", component: IdProjectPage},
    {link: "/news/:id", component: IdNewsPage},
    {link: "/posts/:id", component: IdPostPage},
];

export const allLinksToPages: LinkToPage[] = [...dropdown, ...(navigation.filter(link => !Array.isArray(link.link))), ...idPages];

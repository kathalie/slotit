import NewsPage from "../components/pages/group_pages/NewsPage";
import ArticlesPage from "../components/pages/group_pages/ArticlesPage";
import IdArticlePage from "../components/pages/individual_pages/IdArticlePage";
import AboutUsPage from "../components/pages/AboutUsPage";
import ProjectsPage from "../components/pages/group_pages/ProjectsPage";
import IdProjectPage from "../components/pages/individual_pages/IdProjectPage";
import MainPage from "../components/pages/MainPage";
import IdNewsPage from "../components/pages/individual_pages/IdNewsPage";
import {articleFilters} from "../API/APIQueryBuilder";

export type LinkToPage = {
    link: string | LinkToPage[],
    component: (params?: any) => JSX.Element,
    params?: any,
    caption?: string,
}

export const dropdown: LinkToPage[] = [
    {
        link: "/articles/blog",
        component: ArticlesPage,
        params: articleFilters.byType("blog"),
        caption: "Наш блог"
    },
    {
        link: "/articles/translations",
        component: ArticlesPage,
        params: articleFilters.byType("translation"),
        caption: "Переклади статей українською"
    },
]

export const navigation: LinkToPage[] = [
    {link: "/", component: MainPage, caption: "Головна"},
    {link: "/news", component: NewsPage, caption: "Новини"},
    {link: Object.values(dropdown), component: ArticlesPage, caption: "Пости"},
    {link: "/projects", component: ProjectsPage, caption: "Проекти"},
    {link: "/about_us", component: AboutUsPage, caption: "Про нас"},
]

export const idPages: LinkToPage[] = [
    {link: "/projects/:id", component: IdProjectPage},
    {link: "/news/:id", component: IdNewsPage},
    {link: "/articles/:id", component: IdArticlePage},
];

export const allLinksToPages: LinkToPage[] = [...dropdown, ...(navigation.filter(link => !Array.isArray(link.link))), ...idPages];

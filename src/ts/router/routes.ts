import NewsPage from "../components/pages/group_pages/NewsPage";
import PostsPage from "../components/pages/group_pages/PostsPage";
import AboutUsPage from "../components/pages/AboutUsPage";
import ProjectsPage from "../components/pages/group_pages/ProjectsPage";
import IdProjectPage from "../components/pages/individual_pages/IdProjectPage";
import MainPage from "../components/pages/MainPage";
import IdNewsPage from "../components/pages/individual_pages/IdNewsPage";
import IdPostPage from "../components/pages/individual_pages/IdArticlePage";
import {filters} from "../API/query_builder/API_queries";
import {APIFilter} from "../API/query_builder/queries.types";

export type LinkToPage = {
    link: string | LinkToPage[],
    component: (params?: any) => JSX.Element,
    params?: { filter: APIFilter },
    caption?: string,
}

export const links = {
    posts:  "/posts",
    blog: "/posts/blog",
    translations: "/posts/translation",
    main: "/",
    news: "/news",
    projects: "/projects",
    aboutUs: "/about_us",
    projectId: "/projects/:id",
    postId: "/posts/:id",
    newsId: "/news/:id"
}

export const dropdown: LinkToPage[] = [
    {
        link: links.posts,
        component: PostsPage,
        caption: "Всі пости"
    },
    {
        link: links.blog,
        component: PostsPage,
        params: {filter: filters.postFilters.byType("blog")},
        caption: "Наш блог"
    },
    {
        link: links.translations,
        component: PostsPage,
        params: {filter: filters.postFilters.byType("translation")},
        caption: "Переклади статей українською"
    },
]

export const navigation: LinkToPage[] = [
    {link: links.main, component: MainPage, caption: "Головна"},
    {link: links.news, component: NewsPage, caption: "Новини"},
    {link: dropdown, component: PostsPage, caption: "Пости"},
    {link: links.projects, component: ProjectsPage, caption: "Проекти"},
    {link: links.aboutUs, component: AboutUsPage, caption: "Про нас"},
]

export const idPages: LinkToPage[] = [
    {link: links.projectId, component: IdProjectPage},
    {link: links.newsId, component: IdNewsPage},
    {link: links.postId, component: IdPostPage},
];

export const flattenedNavigation = navigation.map((linkToPage: LinkToPage) => {
    return Array.isArray(linkToPage.link) ?
        linkToPage.link :
        linkToPage
}).flat();

export const allLinksToPages: LinkToPage[] = [...flattenedNavigation, ...idPages];
// export const allLinksToPages: LinkToPage[] = [...dropdown, ...(navigation.filter(link => !Array.isArray(link.link))), ...idPages];

export type CarouselItem = {
    caption: string,
    link: string,
    src: string
}

const randomPhotoLink = "https://picsum.photos/800/600?random=";

export const carouselItems: CarouselItem[] = [
    {caption: "Наш блог", link: links.blog, src: `${randomPhotoLink}1`},
    {caption: "Переклади популярних IT-статей українською!", link: links.translations, src: `${randomPhotoLink}2`},
    {caption: "Наші розробки", link: links.projects, src: `${randomPhotoLink}3`},
    {caption: "Дізнайся більше про нас!", link: links.aboutUs, src: `${randomPhotoLink}4`},
]

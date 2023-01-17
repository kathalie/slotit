import {ArticleCard, CardProps, NewsCard, ProjectCard} from "../components/cards";
import {HasId, Article, Project, News} from "./models";
import {ArticlesService, IService, NewsService, ProjectsService} from "../API/services";

type CardCreator<T> = (props: CardProps<T>) => JSX.Element;

export class ItemType<T extends HasId> {
    private static AllValues: { [name: string]: any } = {};

    static readonly Article= new ItemType<Article>(ArticleCard, new ArticlesService(), "Article");
    static readonly Project = new ItemType<Project>(ProjectCard, new ProjectsService(), "Project");
    static readonly News = new ItemType<News>(NewsCard, new NewsService(), "News");

    private constructor(
        public readonly cardCreator: CardCreator<T>,
        public readonly service: IService<T>,
        public readonly displayValue: string
    ) {
        ItemType.AllValues[displayValue] = this;
    }

    public static parseEnum(data: string): any {
        return ItemType.AllValues[data];
    }
}

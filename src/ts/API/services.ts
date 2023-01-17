import axios from "axios";
import {Article, HasId, News, Project} from "../types/models";
import {APIQueryBuilder} from "./APIQueryBuilder";
import {randomUniqueNumbers} from "../utils/randomizer";

export interface IService<T extends HasId> {
    getRandom(n: number): Promise<T[]>;
    getByQuery(queryBuilder: APIQueryBuilder): Promise<T[]>;
    getById(id: number): Promise<T>;
}

abstract class BaseService<T extends HasId> implements IService<T>{
    static readonly baseURL = "http://localhost:3000";

    protected constructor(private route: string) {
    }

    private getRoute(...path: (string | number)[]): string {
        return [BaseService.baseURL, this.route, ...path].join("/");
    }

    public async getRandom(n: number): Promise<T[]> {
        const response = await axios.get<T[]>(this.getRoute());
        const allItems = response.data;
        const limit = allItems.length;

        if (limit < n) return [] as T[];

        const randomIds = randomUniqueNumbers(n, limit);
        return allItems.filter((item) => randomIds.some(id => item.id === id));
    }

    public async getByQuery(queryBuilder: APIQueryBuilder): Promise<T[]> {
        return (await axios.get<T[]>(this.getRoute(), {params: queryBuilder.getQueryParams()})).data;
    }

    public async getById(id: number): Promise<T> {
        return (await axios.get<T>(this.getRoute(id))).data;
    }
}


export class NewsService extends BaseService<News> {
    constructor() {
        super("news");
    }
}

export class ProjectsService extends BaseService<Project> {
    constructor() {
        super("projects");
    }
}

export class ArticlesService extends BaseService<Article> {
    constructor() {
        super("articles");
    }
}

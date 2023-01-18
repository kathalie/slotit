import axios, {AxiosResponse} from "axios";
import {HasId, News, Post, Project} from "../types/models";
import {IQueryBuilder} from "./query_builder/APIQueryBuilder";

export interface IService<T extends HasId> {
    getByQuery(queryBuilder: IQueryBuilder): Promise<AxiosResponse<T[]>>;

    getById(id: number): Promise<AxiosResponse<T>>;
}

abstract class BaseService<T extends HasId> implements IService<T> {
    static readonly baseURL = "http://localhost:3000";

    protected constructor(private route: string) {
    }

    private getRoute(...path: (string | number)[]): string {
        return [BaseService.baseURL, this.route, ...path].join("/");
    }

    public async getByQuery(queryBuilder: IQueryBuilder): Promise<AxiosResponse<T[]>> {
        return axios.get<T[]>(this.getRoute(), {params: queryBuilder.getQueryParams()});
    }

    public async getById(id: number): Promise<AxiosResponse<T>> {
        return axios.get<T>(this.getRoute(id));
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

export class PostsService extends BaseService<Post> {
    constructor() {
        super("posts");
    }
}

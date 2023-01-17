import axios, {AxiosResponse} from "axios";
import {News, Project} from "../types/models";

const baseURL = "http://localhost:3000";

export abstract class BaseService<T> {
    protected constructor(private route: string) {
    }

    private getRoute(...path: (string | number)[]): string {
        return [baseURL, this.route, ...path].join("/");
    }

    public async getAll(): Promise<AxiosResponse<T[]>> {
        return axios.get<T[]>(this.getRoute());
    }

    public async getPerPage(page: number, limit: number = 10): Promise<AxiosResponse<T[]>> {
        return axios.get<T[]>(this.getRoute(), {
            params: {
                _page: page,
                _limit: limit
            }
        });
    }

    public async getById(id: number): Promise<AxiosResponse<T[]>> {
        return axios.get<T[]>(this.getRoute(id));
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

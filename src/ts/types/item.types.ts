import {HasId, News, Post, Project} from "./models";
import {IService} from "../API/services";
import {newsService, postsService, projectsService} from "../../init";

export class ItemType<T extends HasId> {
    private static AllValues: { [name: string]: any } = {};

    static readonly Post= new ItemType<Post>(postsService, "Post");
    static readonly Project = new ItemType<Project>(projectsService, "Project");
    static readonly News = new ItemType<News>(newsService, "News");

    private constructor(
        public readonly service: IService<T>,
        public readonly displayValue: string
    ) {
        ItemType.AllValues[displayValue] = this;
    }

    public static parseEnum(data: string): any {
        return ItemType.AllValues[data];
    }
}

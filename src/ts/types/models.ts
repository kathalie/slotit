export type HasId = {
    id: number
};

type CommonStructure = {
    title: string,
    description: string,
    content: string,
}

export type Project = HasId & CommonStructure & {
    inProcess: boolean
};

export type News = HasId & CommonStructure & {
    date: Date,
    pictureThumbnail: string,
    project_id: number
};

export type Post = HasId & CommonStructure & {
    date: Date,
    pictureThumbnail: string,
    type: PostType,
};

export type PostType = "blog" | "translation" | "personal_post";

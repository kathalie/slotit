export type HasId = {
    id: number
};

type HasPicture = {
    smallPicture: string,
    largePicture: string
}

type CommonStructure = {
    title: string,
    description: string,
    content: string,
}

export type Project = HasId & CommonStructure & HasPicture & {
    inProcess: boolean
};

export type News = HasId & CommonStructure & {
    date: Date,
    projectId: number
};

export type Post = HasId & CommonStructure & HasPicture & {
    date: Date,
    type: PostType,
};

export type PostType = "blog" | "translation";


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

export type News = HasId & CommonStructure & HasPicture & {
    date: Date,
    project_id: number
};

export type Post = HasId & CommonStructure & HasPicture & {
    date: Date,
    type: PostType,
};

export type PostType = "blog" | "translation";

export const postTypeCaptions: Record<PostType | "all", string> = {
    all: "Всі",
    blog: "Наш блог",
    translation: "Переклади статей українською",
}

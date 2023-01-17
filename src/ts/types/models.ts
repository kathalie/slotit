export type HasId = {
    id: number
};

type CommonStructure = {
    title: string,
    description: string,
    content: string,
}

export type Project = HasId & CommonStructure;

export type News = HasId & CommonStructure & {
    date: Date,
    pictureThumbnail: string
};

export type Article = HasId & CommonStructure & {
    date: Date,
    pictureThumbnail: string,
    type: ArticleType,
};

export type ArticleType = "blog" | "translation" | "personal_article";

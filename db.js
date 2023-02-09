const {faker} = require("@faker-js/faker");

function getPictures() {
    const randomN = faker.datatype.number({min: 1, max: 100});

    return {
        smallPicture: `https://picsum.photos/id/${randomN}/300`,
        largePicture: `https://picsum.photos/id/${randomN}/800/600`
    };
}

function getContentAndDescription() {
    const content = faker.lorem.paragraph();

    return {
        content,
        description: `${content.slice(0, 50)}...`,
    }
}

function getRandomDate() {
    return faker.date.between("2018-01-01", "2023-02-01");
}

function getRandomProjectTitle() {
    const phrase = faker.hacker.noun();

    return `${phrase[0].toUpperCase()}${phrase.slice(1)}`;
}

function mockPosts(n) {
    function getRandomPostType() {
        return faker.datatype.boolean() ? "blog" : "translation";
    }

    const posts = [];

    for (let id = 0; id < n; id++) {
        posts.push({
            id,
            title: faker.hacker.phrase(),
            ...getContentAndDescription(),
            date: getRandomDate(),
            type: getRandomPostType(),
            ...getPictures()
        });
    }

    return posts;
}

function mockProjects(n) {
    const projects = [];
    const idInProcess = faker.datatype.number({min: 0, max: n});

    for (let id = 0; id < n; id++) {
        projects.push({
            id,
            title: getRandomProjectTitle(),
            ...getContentAndDescription(),
            inProcess: id === idInProcess,
            ...getPictures()
        });
    }

    return projects;
}

function mockNews(n) {
    const news = [];

    for (let id = 0; id < n; id++) {
        news.push({
            id,
            title: faker.hacker.phrase(),
            ...getContentAndDescription(),
            date: getRandomDate(),
            projectId: faker.datatype.number({min: 0, max: n - 1}),
        });
    }

    return news;
}


module.exports = () => {
    const data = { projects: [], posts: [], news: [] };
    const n = 50;

    data.projects = mockProjects(n);
    data.posts = mockPosts(n);
    data.news = mockNews(n);

    return data
}

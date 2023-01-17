import React from 'react';
import Carousel from 'better-react-carousel'
import {Link} from "react-router-dom";

//TODO REFACTOR!!!!!!!
const carouselItems = [
    {caption: "Наш блог", link: "/articles/blog", src: "https://picsum.photos/800/600?random=1"},
    {caption: "Переклади популярних IT-статей", link: "/articles/translations", src: "https://picsum.photos/800/600?random=2"},
    {caption: "Наші розробки", link: "/projects", src: "https://picsum.photos/800/600?random=3"},
    {caption: "Дізнайся більше про нас!", link: "/aboutUs", src: "https://picsum.photos/800/600?random=4"},
]

const MainCarousel = () => {
    return (
        <Carousel cols={1} rows={1} loop autoplay={10000} showDots>
            {
                carouselItems.map(item =>
                    <Carousel.Item key={item.link}>
                        <img width="100%" src={item.src} alt={`Image for ${item.caption} link`}/>
                        <Link to={item.link}>{item.caption}</Link>
                    </Carousel.Item>
                )
            }
        </Carousel>
    );
};

export default MainCarousel;

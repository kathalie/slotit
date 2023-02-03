import React from 'react';
import {Link} from "react-router-dom";
import Carousel from "./carousel/Carousel";
import CarouselItem from "./carousel/CarouselItem";
import {carouselItems} from "../../router/routes";

const MainCarousel = () => {
    return (
        <Carousel className="MainCarousel">
            {
                carouselItems.map(item =>
                    <CarouselItem className="MainCarouselItem" key={item.link} width="90%">
                        <img src={item.src} alt={`Image for ${item.caption} link`}/>
                        <div className="info">
                            <p>{item.caption}</p>
                            <hr/>
                            <Link to={item.link}>Дізнатись більше</Link>
                        </div>
                    </CarouselItem>
                )
            }
        </Carousel>
    );
};

export default MainCarousel;

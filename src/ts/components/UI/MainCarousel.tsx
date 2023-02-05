import React from 'react';
import {Link} from "react-router-dom";
import Carousel from "./carousel/Carousel";
import CarouselItem from "./carousel/CarouselItem";
import {carouselItems} from "../../router/routes";
import LearnMore from "./LearnMore";

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
                            <LearnMore link={item.link}/>
                        </div>
                    </CarouselItem>
                )
            }
        </Carousel>
    );
};

export default MainCarousel;

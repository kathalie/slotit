import React from 'react';
import {Link} from "react-router-dom";
import Carousel from "../UI/carousel/Carousel";
import CarouselItem from "../UI/carousel/CarouselItem";
import {carouselItems} from "../../router/routes";
import LearnMore from "../UI/LearnMore";

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

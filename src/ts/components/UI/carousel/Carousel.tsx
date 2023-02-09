import React, {Children, cloneElement, useEffect, useState} from 'react';
import {useSwipeable} from "react-swipeable";

import CarouselControl, {CarouselControlDirection} from "./CarouselControl";
import CarouselIndicator from "./CarouselIndicator";
import {JSXChildren} from "../../../types/basic.types";

const Carousel = ({children, className}: {
    children: JSXChildren,
    className?: string
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const updateIndex = (newIndex: number) => {
        const nOfChildren = Children.count(children);

        if (newIndex < 0) newIndex = nOfChildren - 1;
        else if (newIndex >= nOfChildren) newIndex = 0;

        setActiveIndex(newIndex);
    }

    useEffect(() => {
        const delay = 5000;
        const interval = setInterval(() => {
            if (!paused) updateIndex(activeIndex + 1);
        }, delay);

        return () => {
            if (interval) clearInterval(interval);
        }
    });

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    });

    return (
        <div className={`Carousel ${className ?? ""}`}
             onMouseEnter={() => setPaused(true)}
             onMouseLeave={() => setPaused(false)}
             {...handlers}
        >
            <CarouselControl direction={CarouselControlDirection.Left} index={activeIndex} updateIndex={updateIndex}/>
            <CarouselControl direction={CarouselControlDirection.Right} index={activeIndex} updateIndex={updateIndex}/>
            <div className="scroller" style={{transform: `translateX(-${activeIndex * 100}%)`}}>
                {
                    Children.map(children, (child) => {
                        return cloneElement(child, {width: "100%"});
                    })
                }
            </div>
            <div className="indicators">
                {
                    Children.map(children, (_, index) => {
                        return (
                            <CarouselIndicator setIndex={setActiveIndex}
                                               defaultIndex={index}
                                               className={activeIndex === index ? "active" : ""}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Carousel;

import { useEffect } from "react";
import { useLocation } from "react-router";
import {JSXChildren} from "../types/basic.types";

const ScrollToTop = ({ children }: {children?: JSXChildren}) => {
    const location = useLocation();
    useEffect(() => {
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return <>{children}</>
};

export default ScrollToTop;

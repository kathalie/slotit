import React from 'react';
import {Link} from "react-router-dom";

const LearnMore = ({link, caption = "Дізнатись більше"}: {
    link: string,
    caption?: string
}) => {
    return (
        <Link className="LearnMore" to={link}>{caption}</Link>
    );
};

export default LearnMore;

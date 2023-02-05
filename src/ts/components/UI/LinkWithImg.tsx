import React from 'react';

const LinkWithImg = ({link, src, alt}: {
    link: string,
    src: string,
    alt: string
}) => {
    return (
        <a href={link} target="_blank">
            <img src={src} alt={alt}/>
        </a>
    );
};

export default LinkWithImg;

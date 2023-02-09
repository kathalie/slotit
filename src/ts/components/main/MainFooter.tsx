import React from 'react';
import FooterNavigation from "./navigations/FooterNavigation";

// @ts-ignore
import instIcon from "../../../img/icons/instagram.png";
// @ts-ignore
import fbIcon from "../../../img/icons/facebook.png";
import LinkWithImg from "../UI/LinkWithImg";

const socialMedia: {link: string, icon: string, alt: string}[] = [
    {link: "https://www.instagram.com/", icon: instIcon, alt: "Інстаграм"},
    {link: "https://www.facebook.com/", icon: fbIcon, alt: "Фейсбук"}
]

const MainFooter = () => {
    return (
        <footer className="MainFooter">
            <FooterNavigation/>
            <div className="additional">
                <div className="social-media">
                    {
                        socialMedia.map(((link) => (
                            <LinkWithImg link={link.link}
                                         src={link.icon}
                                         alt={`Посилання на ${link.alt} команди.`}
                                         key={link.link}
                            />
                        )))
                    }
                </div>
                <p className="copyright">&copy; copyright placeholder</p>
            </div>
        </footer>
    );
};

export default MainFooter;

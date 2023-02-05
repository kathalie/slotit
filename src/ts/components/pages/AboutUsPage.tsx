import React from 'react';

// @ts-ignore
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import {faker} from "@faker-js/faker";

import LinkWithImg from "../UI/LinkWithImg";

// @ts-ignore
import siteIcon from "../../../img/icons/site.png";
// @ts-ignore
import githubIcon from "../../../img/icons/github.png";
// @ts-ignore
import katesPhoto from "../../../img/team_photos/kate.jpg";
// @ts-ignore
import dmytrosPhoto from "../../../img/team_photos/dmytro.jpg";

type Contact = "site" | "github";

const icons: Record<Contact, string> = {
    site: siteIcon,
    github: githubIcon
};

type TeamMate = {photo: string, name: string, contacts: Contacts};

type Contacts = Partial<Record<Contact, string>>;

const ourTeam: TeamMate[] = [
    {photo: dmytrosPhoto, name: "Дмитро Попов", contacts:
            {
                site: "https://mitryp.com.ua",
                github: "https://github.com/mitryp"
            }
    },
    {photo: katesPhoto, name: "Катерина Верхогляд", contacts:
            {
                github: "https://github.com/kathalie"
            }
    }
];

const location = {
    lat: 50.464587,
    long: 30.519416
};

const AboutUsPage = () => {
    return (
        <div className="AboutUsPage">
            <div className="about-us-briefly">
                <h1>Про нас</h1>
                <hr/>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                </p>
            </div>
            <h1>Наша команда</h1>
            <div className="our-team">
                {
                    ourTeam.map((teamMate: TeamMate) => (
                        <div className="team-mate" key={teamMate.name}>
                            <div className="photo">
                                <img src={teamMate.photo} alt={`Фото ${teamMate.name}`}/>
                            </div>
                            <div className="summary">
                                <h2 className="name">{teamMate.name}</h2>
                                <hr/>
                                <p>
                                    {
                                        faker.hacker.phrase()
                                    }
                                </p>
                            </div>
                            <div className="contacts">
                                {
                                    Object.entries(teamMate.contacts).map(((contact) => (
                                        <LinkWithImg link={contact[1]}
                                                     src={icons[contact[0] as Contact]}
                                                     alt={`Посилання на ${contact[0]} `}
                                                     key={contact[1]}
                                        />
                                    )))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <hr className="main-hr"/>
            <h1>Де нас знайти</h1>
            <MapContainer className="MapContainer" center={[location.lat, location.long]} zoom={19} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location.lat, location.long]}>
                    <Popup>
                        На парах в найкращому університеті :)
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default AboutUsPage;

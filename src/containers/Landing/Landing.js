import React, {useState} from 'react';
import {useSession} from "../../components/auth/authContext";
import {useHistory} from "react-router-dom";
import Particles from "react-particles-js";
import { Icon } from '@iconify/react';
import mapLegend from '@iconify/icons-mdi/map-legend';

import backgroundHouse from "../../assets/BackGround.jpg";
import TvElement from "../../components/TvElement/TvElement";
import NewsArticle from "../../components/TvElement/News Article.gif";

function Landing() {
    const [loadState, setLoadState] = useState({
        loaded: false
    });

    const context = useSession();
    const history = useHistory();

    const isLoaded = () => {
        setLoadState(prevState => {
            return {
                ...prevState, loaded: true
            }
        });
        const canvas = document.getElementsByClassName('tsparticles-canvas-el');
        const context = canvas[0].getContext('2d');
        const width = canvas[0].width;
        const height = canvas[0].height;
        context.clearRect(0,0,width,height);
        context.globalAlpha = 0.5
    };

    const loggedIn = context.user && Object.values(context.user).length > 0;
    return (
        <div style={{width: "100vw", height: "100vh"}}>
            {loadState.loaded ? <div className="imageShow"/> :
                <div className="imageHide"><div className="loader"/>Loading...</div>
            }
            <TvElement location={{bottom: "12%", right: "55%"}} content={NewsArticle}/>
            <TvElement shadow={false} transform={{rotate: "45"}} location={{bottom: "15.5%", right: "49%"}}/>
            <img src={backgroundHouse} alt="" onLoad={isLoaded} className="backgroundHouse"/>
            <div className="landing-logo-text">A Flock of Black Swan</div>
            <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 160,
                            "density": {
                                "enable": false
                            }
                        },
                        "color": "#b8a270",
                        "size": {
                            "value": 3,
                            "random": true,
                            "anim": {
                                "speed": 4,
                                "size_min": 0.3
                            }
                        },
                        "line_linked": {
                            "enable": false
                        },
                        "move": {
                            "random": true,
                            "speed": 1,
                            "direction": "bottom-right",
                            "out_mode": "bounce"
                        }
                    },
                    "interactivity": {
                        "detect_on": "window",
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "bubble"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        },
                        "modes": {
                            "bubble": {
                                "distance": 100,
                                "duration": 2,
                                "size": 0,
                                "opacity": 0
                            },
                            "repulse": {
                                "distance": 100,
                                "duration": 4
                            }
                        }
                    }
                }}
                style={{
                    width: "100vw",
                    height: "100vh",
                    zIndex: "10",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    pointerEvents: "none"
                }}
            />
            <div className="map-menu-container">
                <button className="mapPlacement button float" onClick={()=>{history.push("/home/dash")}}>Open Map</button>
                <Icon className="map-icon" icon={mapLegend}/>
            </div>

            {loggedIn ?
                 null
                :
                <button onClick={()=>{history.push("/Login")}}>Login</button>
            }

        </div>
    );
}

export default Landing
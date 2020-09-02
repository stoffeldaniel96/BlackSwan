import React, {useEffect} from 'react';
import staticNoise from "./Static.gif";
import tvFrame from "./tv.png";
import uniqid from "uniqid";

function TvElement({shadow, transform, location, content}) {
    const id = uniqid();

    TvElement.defaultProps = {
        shadow: true,
        transform: {},
        location: {},
        content: staticNoise
    };

    useEffect(() => {
        const tv = document.getElementById("tv-"+id);
        if (transform && Object.values(transform).length > 0) {
            Object.entries(transform).map((trans, index) => (
                    tv.style.transform = trans[0]+"("+trans[1]+"deg)"
                )
            );
        }
        if (location && Object.values(location).length > 0) {
            Object.entries(location).map((loc, index) => (
                    tv.style[loc[0]] = loc[1]
                )
            );
        }
    });

    return (
        <div id={"tv-"+id} className="tv-element">
            {shadow ? <div className="shadow"/> : null}
            <img src={content} alt="" className="tvScreen"/>
            <img src={tvFrame} alt="" className="tvFrame"/>
        </div>
    );
}

export default TvElement
import React from 'react';
import Map from "../../components/Map/Map"

function MapPage() {

    const updateParent = (e) => {
        console.log(e);
    }

    return (
        <Map updateParent={updateParent}/>
    );
}

export default MapPage
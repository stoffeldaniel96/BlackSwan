import React, {useEffect} from 'react';
import Map from "../../components/Map/Map"

function MapPage(props) {
    const {selectTab} = props;

    const selectTheTab = () => {
        selectTab("Map");
    }

    const updateParent = (e) => {
        console.log(e);
    }

    useEffect(selectTheTab, [selectTab]);

    return (
        <Map updateParent={updateParent}/>
    );
}

export default MapPage
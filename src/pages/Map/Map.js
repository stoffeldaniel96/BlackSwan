import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
//import MapboxDraw from "@mapbox/mapbox-gl-draw";
//import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import * as turf from "@turf/turf";
import "./map.scss"
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import uniqid from "uniqid";

import californiaGeometry from "../../constants/californiaGeometry";
import notableSpots from "../../constants/notableSpotsExample";
import spot from "./spot.png";
import car from "./Car.png";
import building from "./Building.png"
//import axios from "axios";

const defaultPointData = [
    {
        name: "Possible Safe House",
        description: "The building is in decent shape and is defensible. Maybe it's worth fixing up...",
        special_notes: "N/A",
        icon: "building",
        photoURL: ""
    },
    {
        name: "Working Car",
        description: "'Working' is the operative word as it doesn't really run. It works ENOUGH to be stripped for parts.",
        special_notes: "N/A",
        icon: "car",
        photoURL: "./BrokenDownCar.jpg"
    },
    {
        name: "Food Cache",
        description: "There's a source of food here. It's not much but it's something.",
        special_notes: "Check for rotten material before eating...",
        icon: "spot",
        photoURL: ""
    }
];

const points = turf.randomPoint(300, {bbox: turf.bbox(californiaGeometry)});
let pointsInCal = turf.pointsWithinPolygon(points, californiaGeometry);
pointsInCal.features.forEach(x => {
    const randNum = Math.floor(Math.random() * Math.floor(defaultPointData.length));
    const randomPoint = defaultPointData[randNum];
    x.properties.name = randomPoint.name;
    x.properties.description = randomPoint.description;
    x.properties.special_notes = randomPoint.special_notes;
    x.properties.icon = randomPoint.icon;
    x.properties.id = uniqid()
});

let features = notableSpots.features;
const notableSpotList = {...notableSpots, features: [...features, ...pointsInCal.features]};

function Map(props, ref) {
    //const inputRef = useRef();

    //eslint-disable-next-line
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    const updateParent = (data) => {
        props.updateParent(data)
    };

    const setUpMap = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZHN0b2ZmZWw5NiIsImEiOiJja2VpYXB4MjExNW5yMnhudmZidTVvamt5In0.Oyp7Kow7jq8-dM2FvwjnnQ';
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            // style: 'mapbox://styles/dstoffel96/ckeigywad3wmm19l8m701pchx', // stylesheet location
            style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
            center: [-119.417931, 36.778259], // starting position [lng, lat]
            maxBounds:[-135.60956444537493, 32.53415599999866, -102.93151555462467, 42.00951799999902],
            maxPitch: 0,
            zoom: 6 // starting zoom
        });

        //const Draw = new MapboxDraw();

        // map.addControl(Draw);
        // map.addControl(
        //     new MapboxGeocoder({
        //         accessToken: mapboxgl.accessToken,
        //         mapboxgl: mapboxgl,
        //         bbox: turf.bbox(californiaGeometry),
        //         filter: function(item) {
        //             return item.context
        //                 .map(function(i) {
        //                     return (
        //                         i.id.split('.').shift() === 'region' &&
        //                         i.text === 'California'
        //                     );
        //                 })
        //                 .reduce(function(acc, cur) {
        //                     return acc || cur;
        //                 });
        //         },
        //     }), "bottom-right"
        // );

        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();

        map.on("load", () => {
            const outerMask = turf.polygon([[[-180, -90], [-180, 90], [180, 90], [180, -90], [-180, -90]]]);
            const california = turf.bboxPolygon(turf.bbox(californiaGeometry));

            map.addSource('mask', {
                "type": "geojson",
                "data": turf.difference(outerMask, california)
            });

            map.addLayer({
                "id": "zmask",
                "source": "mask",
                "type": "fill",
                "paint": {
                    "fill-color": "white",
                    'fill-opacity': 0.50
                }
            });

            map.addSource('notableSpots', {
                "type": "geojson",
                "data": notableSpotList,
            });

            map.loadImage(spot, function(error, image) {
                if (error) {
                    console.warn(error);
                } else {
                    map.addImage('spot', image);
                }
            });

            map.loadImage(car, function(error, image) {
                if (error) {
                    console.warn(error);
                } else {
                    map.addImage('car', image);
                }
            });

            map.loadImage(building, function(error, image) {
                if (error) {
                    console.warn(error);
                } else {
                    map.addImage('building', image);
                }
            });

            map.addLayer( {
                "id": "notable-spots",
                "source": "notableSpots",
                "type": "symbol",
                "minzoom": 5,
                'layout': {
                    'icon-image': [
                        'case',
                        ['has','icon'],
                        ['get','icon'],
                        "spot"
                    ],
                    'icon-size': [
                        'case',
                        ['==', ['get', 'icon'], "spot"],
                        0.025,
                        ['==', ['get', 'icon'], "car"],
                        0.2,
                        ['==', ['get', 'icon'], "building"],
                        0.18,
                        0
                    ],
                    "icon-allow-overlap": true
                }
            });

            setMap(map);
        });

        map.on("click", async function(e) {
            const features = map.queryRenderedFeatures(e.point, {layers: ["notable-spots"]});
            updateParent(null);
            if (features && features[0]) {
                const index = notableSpotList.features.findIndex(predicate => { return predicate.properties.id === features[0].properties.id});
                if (index >= 0) {
                    map.flyTo({zoom: 12, curve: 1.3, speed: 0.5, center: notableSpotList.features[index].geometry.coordinates});
                    updateParent(notableSpotList.features[index])
                }
            } else {

            }

        })

    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{setUpMap()}, []);



    // useImperativeHandle(ref, () => ({
    //     // focus: () => {
    //     //     inputRef.current.focus();
    //     // }
    // }));

    return (
        <div ref={el => (mapContainer.current = el)} className="mapContainer" />
    );
}

export default Map
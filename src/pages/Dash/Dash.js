import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import Map from "../Map/Map";

import desk_bg from "./Desk_BG.jpg";
import gun from "./pistol.png";
import paper from "./Paper.png";
import MapTexture from "./MapTexture2.png";

function Dash() {
    const history = useHistory();
    const [loadState, setLoadState] = useState({
        loadCount: 0,
        imgCount: 5,
        loaded: false,
    });
    const [list, setListState] = useState(null);

    const updateList = (data) => {
        setListState(data);
    };

    const handleLoad = () => {
        setLoadState(prevState => {
            return {
                ...prevState, loadCount: prevState.loadCount + 1
            }
        });
        if (loadState.loadCount === loadState.imgCount-1) {
            setLoadState(prevState => {
                return {
                    ...prevState, loaded: true
                }
            });
        }
    };

    return (
        <div style={{ overflowX: "hidden", overflowY: "hidden"}} >
            {loadState.loaded ? <div className="imageShow"/> :
                <div className="imageHide"/>
            }
            <button className="button place-tl float-right" onClick={()=>{history.push("/")}}>back</button>
            <img onLoad={handleLoad} src={desk_bg} alt={"desk"} className="desk-bg"/>
            <img onLoad={handleLoad} src={desk_bg} alt={"floor"} className="floor-bg"/>
            <img onLoad={handleLoad} src={paper} alt={"paper"} className="paper"/>
            {list ?
                <table className="notepad-table" id={list.properties.id}>
                    <tbody>
                        <tr>
                            <td width={"100%"}>
                                <strong>{list.properties.name || "???"}</strong>
                            </td>
                        </tr>
                        <tr style={{marginTop: "15px"}}>
                            <td width={"100%"}>
                                {list.properties.description || "???"}
                            </td>
                        </tr>
                        <tr>
                            <td width={"100%"}>
                                Special Notes: {list.properties.special_notes || "???"}
                            </td>
                        </tr>
                        <tr>
                            <td width={"100%"}>
                               Coordinates:  <strong> <br/> Lng {list.geometry.coordinates[0]} <br/>Lat {list.geometry.coordinates[1]} </strong>
                            </td>
                        </tr>
                    </tbody>
                 </table>
                : null}

            <img onLoad={handleLoad} src={MapTexture} alt={""} className="mapTexture"/>
            <img onLoad={handleLoad} src={gun} alt={"gun"} className="gun"/>
            <Map updateParent={updateList}/>
        </div>
    );
}

export default Dash
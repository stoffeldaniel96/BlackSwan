import React, {useEffect, useState} from 'react';
import {Items} from "../../util/API";
import {useSession} from "../../components/auth/authContext";

function Inventory() {
    const {firebase} = useSession();
    const [items, setItems] = useState([]);

    const getCharacterItems = async () => {
        try {
            const token = await firebase.auth.currentUser.getIdToken();
            const items = await Items.index(token)
            setItems(items.data)
        } catch(e) {
            console.warn(e);
        }
    }

    useEffect(()=>{
        if (items.length === 0 && firebase?.auth?.currentUser) {
            getCharacterItems().then(r => {});
        }
    },[firebase.auth.currentUser]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            Inventory
            <table>
                <tbody>
                {items.map((item, index) => {
                    return (
                        <tr key={`item ${index}`}>
                            <td>
                                {item.name}
                            </td>
                            {Object.entries(item.properties).map((prop,pIndex) => {
                                return <td key={`key ${pIndex}`}>{prop[0]}: {prop[1]}</td>
                            })}
                        </tr>

                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Inventory
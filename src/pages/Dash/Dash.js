import React, {useEffect, useState} from 'react';
import {useSession} from "../../components/auth/authContext";
import {Characters} from "../../util/API/CharacterAPI";

function Dash() {
    const {user} = useSession();
    const [character, setCharacter] = useState(null);

    const getCurrentCharacter = () => {
        user.getToken().then((token)=>{
            Characters.single(token, user.current_char).then(response => {
                setCharacter(response.data)
            })
        }).catch((e) => {
            console.warn(e);
        })
    }

    useEffect(()=> {
            if (user.getToken) {
                getCurrentCharacter();
            }
        },[user]); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {character && `You are playing as ${character.first_name} ${character.last_name}`}
        </div>
    );
}

export default Dash
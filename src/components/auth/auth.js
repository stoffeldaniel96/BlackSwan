import React from 'react';

export const useAuth = (firebase) => {
    const [userState, setUserState] = React.useState(() => {
        let user = JSON.parse(localStorage.getItem("blackswan_user")) || firebase.auth.currentUser;
        return {
            initializing: !user,
            user,
            loggedIn: user !== null && user !== {}
        }
    });

    function onChange({user}) {
        localStorage.setItem("blackswan_user", JSON.stringify(user))
        setUserState({ initializing: false, user, loggedIn: user !== null && user !== {} });
    }

    async function getToken(force = false) {
        const curUser = await firebase.auth.currentUser;
        return await curUser.getIdToken(force);
    }

    function updateUser(newUserState) {
        setUserState(prevState => {
            return {
                ...prevState, user: {...prevState.user, ...newUserState}
            }
        })
    }

    React.useEffect(() => {
        const unsubscribe = firebase.onAuthStateChange(onChange);
        return () => unsubscribe()
    }, [firebase]);

    return {...userState, updateUser, getToken}
};
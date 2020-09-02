import React from 'react';

export const useAuth = (firebase) => {
    const [userState, setUserState] = React.useState(() => {
        const user = firebase.auth.currentUser;
        return {
            initializing: !user,
            user,
            loggedIn: user !== null && user !== {}
        }
    });

    function onChange({user}) {
        setUserState({ initializing: false, user, loggedIn: user !== null && user !== {} });
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

    return {...userState, updateUser}
};
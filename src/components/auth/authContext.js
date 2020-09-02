import React, {useContext} from "react";

const AuthContext = React.createContext({
    user: null,
});

export const useSession = () => {
    return useContext(AuthContext)
};

export default AuthContext;
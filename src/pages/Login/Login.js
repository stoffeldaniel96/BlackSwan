import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import {useSession} from "../../components/auth/authContext";

const Login = () => {
    const context = useSession();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = async (event,email, password) => {
        event.preventDefault();
            try {
                await context.firebase.auth.signInWithEmailAndPassword(email, password);
                history.push("/home/dash");
            } catch (e) {
                setError(e.message);
            }

        };

    const signOut = async (event) => {
        event.preventDefault();
        await context.firebase.auth.signOut();
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };

    const loggedIn = context.user && Object.values(context.user).length > 0;

    return (
        !context.initializing ?
        <div className="mt-8">
            {!loggedIn ? <div><h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
                    <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
                        <form className="">
                            <label htmlFor="userEmail" className="block">
                                Email:
                            </label>
                            <input
                                type="email"
                                className="my-1 p-1 w-full"
                                name="userEmail"
                                value = {email}
                                placeholder="E.g: faruq123@gmail.com"
                                id="userEmail"
                                onChange = {(event) => onChangeHandler(event)}
                            />
                            <label htmlFor="userPassword" className="block">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="mt-1 mb-3 p-1 w-full"
                                name="userPassword"
                                value = {password}
                                placeholder="Your Password"
                                id="userPassword"
                                onChange = {(event) => onChangeHandler(event)}
                            />
                            <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                                Sign in
                            </button>
                        </form>
                        <p className="text-center my-3">
                            Don't have an account?{" "}
                            <Link to="signUp" className="text-blue-500 hover:text-blue-600">
                                Sign up here
                            </Link>{" "}
                            <br />{" "}
                            <Link to = "passwordReset" className="text-blue-500 hover:text-blue-600">
                                Forgot Password?
                            </Link>
                        </p>
                    </div></div> :
                <div>
                    <p>{context.user.display_name || context.user.email}</p>
                    <button onClick={signOut}>Sign Out</button>
                </div>}
        </div> : null
    );
};
export default Login;
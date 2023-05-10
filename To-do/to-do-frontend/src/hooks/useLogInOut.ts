import { useState } from "react";
import { UserAPI } from "../api/user.api";

export const useLogInOut = (setIsLogged: React.Dispatch<React.SetStateAction<boolean>>) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const [errorValue, setErrorValue] = useState("");
    const [status, setStatus] = useState("");

    const handleLogin = async () => {
        if(!email) setEmailError(true);
        else setEmailError(false);

        if(!password) setPasswordError(true);
        else setPasswordError(false);

        if(password && email) {
            await UserAPI.login({user: {email, password}, setErrorValue, setStatus, setIsLogged});
            setEmail(""); setPassword("");
          }
    }

    const handleLogout = async () => {
        await UserAPI.logout(setIsLogged);
    }

    return{
        api: {
            handleLogin,
            setEmail,
            setPassword,
            handleLogout,
        },
        email,
        emailError,
        password,
        passwordError,
        errorValue,
        status,
    }
}
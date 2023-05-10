import { useState } from "react";
import { UserAPI } from "../api/user.api";

export const useSignin = () => {
    const [newEmail, setNewEmail] = useState("");
    const [newEmailError, setNewEmailError] = useState(false);

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(false);

    const [signinStatus, setSigninStatus] = useState("");
    const [signinErrorvalue, setSigninErrorValue] = useState("");

    const handleSignin = async () => {
        if(!newEmail) setNewEmailError(true);
        else setNewEmailError(false);

        if(!name) setNameError(true);
        else setNameError(false);

        if(!newPassword) setNewPasswordError(true);
        else setNewPasswordError(false);
        
        if(newPassword && name && newEmail) {
            await UserAPI.register({ user: {email: newEmail, name, password: newPassword}, setSigninErrorValue, setSigninStatus});
            setNewEmail(""); setName(""); setNewPassword("");
          }
    }

    return {
        register: {
            newEmail,
            newEmailError,
            name,
            nameError,
            newPassword,
            newPasswordError,
            signinErrorvalue,
            signinStatus,
        },
        api: {
            setNewEmail,
            setName,
            setNewPassword,
            handleSignin,
        }
    };
}
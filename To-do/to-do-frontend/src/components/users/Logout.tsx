import { Button } from "@mantine/core";
import { useLogInOut } from "../../hooks/useLogInOut";
import { ParamsLogout } from "../../types/interfacesAndConst";

export function Logout ({setIsLogged}: ParamsLogout) {
    const {api} = useLogInOut(setIsLogged);

    return(
        <div className="logout">
            <Button onClick={api.handleLogout} color="grape" radius="xs">Logout</Button>
        </div>
    );
}
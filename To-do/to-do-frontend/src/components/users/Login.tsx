import { Alert, Button, TextInput } from "@mantine/core";
import { useLogInOut } from "../../hooks/useLogInOut";
import { ParamsLogout } from "../../types/interfacesAndConst";

export function Login( {setIsLogged} : ParamsLogout ) {
   const {email, emailError, password, passwordError, status, errorValue, api} = useLogInOut(setIsLogged);

    return(
    <div className="login">
         <p>You have to log-in if you want to use the app!</p>
        <TextInput
      placeholder="Your e-mail"
      label="E-mail"
      radius="xs"
      value={email}
      type="email"
      required
      onChange={(e) => api.setEmail(e.target.value)}
      error={emailError && "enter an email"}
        />
        <TextInput
      placeholder="Your password"
      label="Password"
      radius="xs"
      type="password"
      required
      value={password}
      onChange={(e) => api.setPassword(e.target.value)}
      error={passwordError && "enter a password"}
        />
        {status === "error" && <Alert radius="xs" title="Error!" color="red">
          {errorValue}
        </Alert>}
        <Button onClick={api.handleLogin} color="grape" radius="xs"> Log-in </Button>
    </div>);
}
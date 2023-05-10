import { Alert, Button, TextInput } from "@mantine/core";
import { useSignin } from "../../hooks/useSignin";


export function Signin() {
    const {api, register} = useSignin();

    return(
    <div className="signin">
         <p>If you don't have account, create it here!</p>
        <TextInput
      placeholder="Your e-mail"
      label="E-mail"
      radius="xs"
      required
      type="email"
      value={register.newEmail}
      onChange={(e) => api.setNewEmail(e.target.value)}
      error={register.newEmailError && "enter an email"}
        />
        <TextInput
      placeholder="Your name"
      label="Name"
      radius="xs"
      required
      value={register.name}
      onChange={(e) => api.setName(e.target.value)}
      error={register.nameError && "name cant be empty"}
        />
        <TextInput
      placeholder="Your password"
      label="Password"
      radius="xs"
      type="password"
      required
      value={register.newPassword}
      onChange={(e) => api.setNewPassword(e.target.value)}
      error={register.newPasswordError && "enter the password"}
        />
        {register.signinStatus === "error" && <Alert radius="xs" title="Error!" color="red">
          {register.signinErrorvalue}
        </Alert>}
        {register.signinStatus === "registered" && <p>Now you can log-in using the first form</p>}
        <Button onClick={api.handleSignin} color="grape" radius="xs"> Sign-in </Button>
    </div>);
}
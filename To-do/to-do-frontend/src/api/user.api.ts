import React from "react";
import { loginParams, registerParams } from "../types/interfacesAndConst";

export class UserAPI {
    public static register = async ({user, setSigninErrorValue, setSigninStatus }: registerParams) => {
        await fetch('http://localhost:5000/authentication/register', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(user),
          }).then((response) => {
            if (response.ok) {
               setSigninStatus("registered");
              return response.json();
            }
            setSigninStatus("error");
            return response.json();
         })
         .then((data) => {
            setSigninErrorValue(data.message);
          })
          .catch((err) => {
            console.log(err.message)
          });
    } 

    public static login = async ({user, setErrorValue, setStatus, setIsLogged }: loginParams) => {
      await fetch('http://localhost:5000/authentication/log-in', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(user),
          }).then((response) => {
            if (response.ok) {
              setIsLogged(true);
              return response.json();
            }
            setStatus("error");
            return response.json();
         })
          .then((data) => {
            setErrorValue(data.message);
          })
          .catch((err) => {
            console.log(err.message);
          });
    }

    public static logout = async (setIsLogged: React.Dispatch<React.SetStateAction<boolean>>) => {
      await fetch('http://localhost:5000/authentication/log-out', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => {
        if (response.ok) {
          setIsLogged(false);
          return response.json();
        }
        return response.json();
     })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
}
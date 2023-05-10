import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import { Task } from "./task.type";

export const url: string = 'http://localhost:5000/tasks';

export interface ParamsStr {
    urlEnd: string;
}

export interface Params {
    urlEnd: string;
    task: Task;
    setIsEditOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ParamsButtons {
    setUrlEnd: React.Dispatch<React.SetStateAction<string>>;
  }

export interface ParamsTask {
    urlEnd: string;
    task: Task;
}

export interface ParamsLogout {
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  }

export interface registerParams {
    user: CreateUserDto;
    setSigninErrorValue: React.Dispatch<React.SetStateAction<string>>;
    setSigninStatus: React.Dispatch<React.SetStateAction<string>>;
 }
 
export interface loginParams {
    user: LoginUserDto;
    setErrorValue: React.Dispatch<React.SetStateAction<string>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
 }
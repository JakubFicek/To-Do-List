import { IsEmail, IsNotEmpty, IsString, Matches, MinLength} from "class-validator";

export class RegisterDto {
    @IsNotEmpty()  
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: ' Your password is too weak and should include, Big letter itp. '})
    password: string;
  }
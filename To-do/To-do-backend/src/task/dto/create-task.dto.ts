import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    content: string;
    
    @IsBoolean()
    @IsNotEmpty()
    done: boolean;
}

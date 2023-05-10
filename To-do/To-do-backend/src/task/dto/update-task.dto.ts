import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsNumber()
    @IsOptional()
    id: number;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content: string;
    
    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    done: boolean;
}

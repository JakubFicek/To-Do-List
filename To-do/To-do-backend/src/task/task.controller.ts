import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt.guard';
import { RequestWithUser } from 'src/authentication/interface/requestWithUser.interface';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: RequestWithUser) {
    return this.taskService.createTask(createTaskDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  findAllTasks(@Req() req: RequestWithUser) {
    return this.taskService.findAllTasks(req.user);
  }

  @Get("active")
  @UseGuards(JwtAuthenticationGuard)
  findActiveTasks(@Req() req: RequestWithUser) {
    return this.taskService.findActiveTasks(req.user);
  }

  @Get("completed")
  @UseGuards(JwtAuthenticationGuard)
  findCompletedTasks(@Req() req: RequestWithUser) {
    return this.taskService.findCompletedTasks(req.user);
  }

  @Get(':id')
  findOneTask(@Param('id') id: string) {
    return this.taskService.findOneTask(+id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(+id, updateTaskDto);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string) {
    return this.taskService.removeTask(+id);
  }
}

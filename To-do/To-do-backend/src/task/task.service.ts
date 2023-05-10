import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import Task from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async createTask(task: CreateTaskDto, user: User) {
    const newTask = await this.tasksRepository.create({
      ...task,
      owner: user
    });
    await this.tasksRepository.save(newTask);
    return newTask;
  }

  findAllTasks(user: User) {
    return this.tasksRepository.find({where: {owner: user}, order: {id: 'DESC'} });
  }

  findActiveTasks(user: User) {
    return this.tasksRepository.find({where: {owner: user, done: false}, order: {id: 'DESC'} });
  }

  findCompletedTasks(user: User) {
    return this.tasksRepository.find({where: {owner: user, done: true}, order: {id: 'DESC'} });
  }

  async findOneTask(id: number) {
    const task = await this.tasksRepository.findOne({
      where: {id},
    });
    if (task) return task;
    throw new HttpException("Task not found", HttpStatus.NOT_FOUND)
  }

  async updateTask(id: number, task: UpdateTaskDto) {
    await this.tasksRepository.update(id, task);
    const updatedTask = await this.tasksRepository.findOne({
      where: {id},
    });
    if(updatedTask) return updatedTask;
    throw new HttpException(`Task with ${id} not found`, HttpStatus.NOT_FOUND);
  }

  async removeTask(id: number) {
    const deleteResponse = await this.tasksRepository.delete(id);
    if(!deleteResponse.affected) {
      throw new HttpException(`Post with ${id} not found`, HttpStatus.NOT_FOUND);
    }
  }
}

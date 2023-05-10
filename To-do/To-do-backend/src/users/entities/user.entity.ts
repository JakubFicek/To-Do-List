import { Exclude } from "class-transformer";
import Task from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({unique: true})
    public email: string;

    @Column()
    public name: string;
   
    @Column()
    @Exclude()
    public password: string;

    @OneToMany(() => Task, (task: Task) => task.owner)
    public tasks: Task[]

}


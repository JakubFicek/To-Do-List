import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Task {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public content: string;

    @Column()
    public done: boolean;

    @ManyToOne(() => User, {eager: true})
    @JoinColumn()
    public owner: User;
}

export default Task;


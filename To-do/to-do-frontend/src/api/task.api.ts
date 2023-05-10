import { CreateTaskDto } from "../dto/create-task.dto";
import { updateTaskDto } from "../dto/update-task.dto";

export class TaskAPI {
    public static fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json());

    public static createTask = async (newTask: CreateTaskDto) => 
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            body: JSON.stringify(newTask),
          }).then((response) => response.json())
          .catch((err) => {
            console.log(err.message)
          });

    public static deleteTask = async (id: number) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      }).then((response) => response.json()
       ).catch((err) => {
        console.log(err.message);
       })
    }

    public static updateTask = async (editedTask: updateTaskDto) => {
      await fetch(`http://localhost:5000/tasks/${editedTask.id}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(editedTask),
        }).then((response) => {
          if(response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong with updating operation");
        }).catch((err) => {
          console.log(err.message);
         })
  } 
}
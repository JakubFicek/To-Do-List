import { useState } from "react";
import { useSWRConfig } from "swr";
import { TaskAPI } from "../api/task.api";
import { url } from "../types/interfacesAndConst";


export const useCreateTask = (urlEnd: string) => {
    const [newTask, setNewTask] = useState("");
    const [newTaskError, setNewTaskError] = useState(false);
    
    const { mutate } = useSWRConfig();

    const handleCreation = async () => {
        if(!newTask) setNewTaskError(true);
        else setNewTaskError(false);

        if(newTask) {
            await TaskAPI.createTask({content: newTask, done: false});
            mutate(url + urlEnd);
            setNewTask("");
        }
    }

    return {
        api: {
            handleCreation,
            setNewTask,
        },
        newTask,
        newTaskError,
    };
}
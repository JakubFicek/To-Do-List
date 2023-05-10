import { useState } from "react";
import { useSWRConfig } from "swr";
import { TaskAPI } from "../api/task.api";
import { url } from "../types/interfacesAndConst";
import { Task } from "../types/task.type";

export const useTask = (task : Task, urlEnd:string) => {
    const [isEditOn, setIsEditOn] = useState(false);

    const { mutate } = useSWRConfig();

    const activeOrNot = async () => {
        await TaskAPI.updateTask({id: task.id, content: task.content, done: !task.done});
        mutate(url + urlEnd);
    }

    const handleDelete = async () => {
        await TaskAPI.deleteTask(task.id);
        mutate(url + urlEnd);
    }

    return {
        isEditOn,
        api: {
            activeOrNot,
            handleDelete,
            setIsEditOn,
        }
    };
}
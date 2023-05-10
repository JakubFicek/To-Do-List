import { useState } from "react";
import { useSWRConfig } from "swr";
import { TaskAPI } from "../api/task.api";
import { url } from "../types/interfacesAndConst";
import { Task } from "../types/task.type";

export const useEdit = (urlEnd: string ,task: Task, setIsEditOn: React.Dispatch<React.SetStateAction<boolean>> ) => {
    const [editedTask, setEditedTask] = useState("");
    const [editedTaskError, setEditedTaskError] = useState(false);

    const { mutate } = useSWRConfig();

    const handleEdition = async () => {
        if(!editedTask) setEditedTaskError(true);
        else setEditedTaskError(false);

        if(editedTask) {
            await TaskAPI.updateTask({id: task.id, content: editedTask, done: task.done});
            mutate(url + urlEnd);
            setEditedTask("");
            setIsEditOn(false);
        }
    }

    return {
        api: {
            handleEdition,
            setEditedTask,
        },
        editedTask,
        editedTaskError
    };
}
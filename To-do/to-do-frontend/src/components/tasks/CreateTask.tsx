import { Button, TextInput } from "@mantine/core";
import { useCreateTask } from "../../hooks/useCreateTask";
import { ParamsStr } from "../../types/interfacesAndConst";

export function CreateTask ({ urlEnd }: ParamsStr) {
    const {api, newTask, newTaskError} = useCreateTask(urlEnd);
    
    return(
        <div className="createTask">
          <TextInput
            placeholder="Your task value"
            label="New task"
            radius="xs"
            value={newTask}
            onChange={(e) => api.setNewTask(e.target.value)}
            error={newTaskError && "New task value shouldn't be empty!"}
          />
          <Button onClick={api.handleCreation} color="teal" radius="xs"> Create </Button>
        </div>
    );
}
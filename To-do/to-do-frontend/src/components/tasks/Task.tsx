import { Button, Checkbox } from "@mantine/core";
import { useTask } from "../../hooks/useTask";
import { ParamsTask } from "../../types/interfacesAndConst";
import { Edit } from "./Edit";

export function TaskC ({urlEnd,task}: ParamsTask) {
    const { api, isEditOn } = useTask(task, urlEnd);

    return(
        <div className="task">
            <Checkbox
                    className='myCheckbox'
                    size="md"
                    key={task.id}
                    label={task.content}
                    color="teal"
                    onChange={api.activeOrNot}
                    defaultChecked={task.done} 
                />
            <Button.Group className="buttons">
                <Button onClick={api.handleDelete} radius="md" color="red">Delete</Button>
                <Button onClick={() => api.setIsEditOn(!isEditOn)}radius="md" color="yellow">Edit</Button>
            </Button.Group>
        {isEditOn && <Edit urlEnd={urlEnd} task={task} setIsEditOn={api.setIsEditOn} />}
        </div>
    );
}
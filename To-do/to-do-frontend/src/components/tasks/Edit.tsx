import { Button, TextInput } from "@mantine/core";
import { useEdit } from "../../hooks/useEdit";
import { Params } from "../../types/interfacesAndConst";

export function Edit ({urlEnd ,task, setIsEditOn}: Params) {
    const {api, editedTask, editedTaskError} = useEdit(urlEnd ,task, setIsEditOn);

    return (
        <div className="editPart">
        <TextInput
            placeholder="Your task value"
            label="New value of task"
            radius="xs"
            value={editedTask}
            required
            onChange={(e) => api.setEditedTask(e.target.value)}
            error={editedTaskError && "Edited task value shouldn't be empty!"}
          />
          <Button onClick={api.handleEdition} color="green" radius="xs"> Save </Button>
        </div>
    );
}
import { useState } from "react";
import Buttons from "./Buttons";
import { CreateTask } from "./CreateTask";
import { List } from "./List";

export function TaskPage () {
    const [urlEnd, setUrlEnd] = useState("");

    return (
        <div className="page">
            <CreateTask urlEnd={urlEnd} />
            <Buttons setUrlEnd={setUrlEnd} />
            <List urlEnd={urlEnd} />
        </div>
    );
}
import useSWR from "swr";
import { TaskAPI } from "../../api/task.api";
import { ParamsStr, url } from "../../types/interfacesAndConst";
import { Task } from "../../types/task.type";
import { TaskC } from "./Task";

export function List ({urlEnd}: ParamsStr) {
    const {data, error} = useSWR(url + urlEnd, TaskAPI.fetcher);

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <ul className="list">
            {data.map((task: Task) => 
                <li key={task.id}><TaskC urlEnd={urlEnd} task={task} /></li>)}
        </ul>
    );
}
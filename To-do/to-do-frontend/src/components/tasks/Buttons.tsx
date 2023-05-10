import {Button} from '@mantine/core';
import { ParamsButtons } from '../../types/interfacesAndConst';

function AddButtons ({setUrlEnd}: ParamsButtons) {
    return(
      <div>
        <div className="addButtons">
             <Button onClick={() => setUrlEnd("")} className="but" color="teal">
                 See all tasks
             </Button>
             <Button onClick={() => setUrlEnd("/active")} className="but" color="teal">
                 See active tasks
             </Button>
             <Button onClick={() => setUrlEnd("/completed")} className="but" color="teal" >
                 See completed tasks
             </Button>
        </div>
      </div>
    );
}

export default AddButtons;
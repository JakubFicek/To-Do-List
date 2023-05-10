import './App.css';
import { Login } from './components/users/Login';
import { Signin } from './components/users/Signin';
import { Logout } from './components/users/Logout';
import { TaskPage } from './components/tasks/TaskPage';
import { useState } from 'react';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="App">
      <div className='mainLook'>
        <h1 className='name' > To Do List App! </h1>
        {isLogged && <Logout setIsLogged={setIsLogged} />}
      </div>
        {!isLogged && <Login setIsLogged={setIsLogged} />}
        {!isLogged && <Signin /> }
        {isLogged && <TaskPage/>}
    </div>
  );
}

export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { Profile } from './pages/Profile';
import { Task } from './pages/Task';
import { FormRegister } from './components/FormRegister';
import { FormUpdate } from './components/FormUpdate';


function App() {
  const [user, setUser] = useState(null); // null means not logged in

 
  return (
    <Router>
      <div className="d-flex">
        <NavBar />
        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/project' element={<Projects />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/task' element={<Task/>} />
            <Route path='/formRegister/:type' element={<FormRegister/>}/>
            <Route path='/formUpdate/:type' element={<FormUpdate/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App


import { NavBar } from './components/navBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/profile';
import { Projects } from './pages/Projects';
import { Task } from './pages/task';

function App() {
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
            
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

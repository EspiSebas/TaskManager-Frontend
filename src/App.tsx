import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Profile } from './pages/Profile';
import { Task } from './pages/Task';
import { FormRegister } from './components/FormRegister';
import { FormUpdate } from './components/FormUpdate';
import { Login } from './components/login';
import { Register } from './components/Register';

function App() {
  const [user, setUser] = useState(null);
 

  return (
    <Router>
      <div className="d-flex">
        {user && <NavBar />}
        <div className="flex-grow-1 p-4">
          <Routes>
            {/* Ruta pública */}
            <Route
              path="/login"
              element={
                user ? <Navigate to="/" replace /> : <Login setUser={setUser}/>
              }
            />
            <Route path='/register' element={<Register/>}/>

            {/* Rutas protegidas */}
            {user ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/project" element={<Projects info={user} />} />
                <Route path="/profile" element={<Profile info={user} setUser={setUser} />} />
                <Route path="/task" element={<Task info={user}/>} />
                <Route path="/formRegister/:type" element={<FormRegister />} />
                <Route path="/formUpdate/:type" element={<FormUpdate />} />
              </>
            ) : (
              // Si el usuario no está logueado, cualquier otra ruta redirige a login
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

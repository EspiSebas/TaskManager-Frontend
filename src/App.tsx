import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Profile } from './pages/Profile';
import { Task } from './pages/Task';
import { FormRegister } from './components/FormRegister';
import { FormUpdate } from './components/FormUpdate';
import { Login } from './components/login';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


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

            {/* Rutas protegidas */}
            {user ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/project" element={<Projects />} />
                <Route path="/profile" element={<Profile info={user} setUser={setUser} />} />
                <Route path="/task" element={<Task />} />
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

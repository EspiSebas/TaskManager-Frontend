import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate()
  const handleLogin = async () => {
    try{
      const response = await axios.post('http://localhost:3000/auth/login',{
        email, 
        password
      })

      const token = response.data;
      localStorage.setItem('token', token);
      navigate('/');
      // Llamada para obtener perfil
      const profileRes = await axios.get('http://localhost:3000/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(profileRes.data);
    }catch(err){
      console.log(err)
      alert('Mistake to log in!!')
    }
  };


  const handleSubmit = (e) => {
     e.preventDefault();
  }

    return (
     <> 
     <div className='mainContainer'>
        <div  className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <div className="card p-5 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center mb-2">
                <div className="bg-primary text-white rounded p-2 me-2">
                  <i className="bi bi-check2" style={{ fontSize: "1.2rem" }}></i>
                </div>
                <h3 className="mb-0 text-primary">TaskManager</h3>
              </div>
              <h5 className="text-dark">Login</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3 text-end">
                <a href="#" className="text-decoration-none text-primary small">
                  Forgot password?
                </a>
              </div>
              <button className="btn btn-primary w-100" onClick={(handleLogin)}>
               Log in
              </button>
            </form>
            <div className="text-center mt-3 small">
              Dont have an account?{" "}
              <a href="#" className="text-primary text-decoration-none">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div> 
    </>
      );
}

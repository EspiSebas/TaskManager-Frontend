import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  
  const navigate = useNavigate()
  const handleRegister = async () => {
    try{
      const response = await axios.post('http://localhost:3000/auth/register',{
        name,
        email, 
        password
      })

      
      navigate('/');
    
      
    }catch(err){
      console.log(err)
      alert('Mistake to log in!!')
    }
  };


  const handleSubmit = (e:any) => {
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
              <h5 className="text-dark">Register</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Name Completed"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
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
              <button className="btn btn-primary w-100" onClick={(handleRegister)}>
              Sign Up
              </button>
            </form>
            <div className="text-center mt-3 small">
             Have an account?{" "}
              <Link to="/login" className="text-primary text-decoration-none">
                Login
              </Link>
              
            </div>
          </div>
        </div>
      </div> 
    </>
      );
}

import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      onLogin(username);
    }
  };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 ">
          <div className="card p-5 shadow-lg " style={{ width: "100%" }}>
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center mb-2">
                <div className="bg-primary text-white rounded p-2 me-2">
                  <i className="bi bi-check2" style={{ fontSize: "1.2rem" }}></i>
                </div>
                <h3 className="mb-0 text-primary">TaskManager</h3>
              </div>
              <h5 className="text-dark">Login</h5>
            </div>
            <form>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-3 text-end">
                <a href="#" className="text-decoration-none text-primary small">
                  Forgot password?
                </a>
              </div>
              <Link type="submit" className="btn btn-primary w-100" to="/home">
               Log in
              </Link>
            </form>
            <div className="text-center mt-3 small">
              Dont have an account?{" "}
              <a href="#" className="text-primary text-decoration-none">
                Sign up
              </a>
            </div>
          </div>
        </div>
      );
}

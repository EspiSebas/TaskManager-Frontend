import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Profile = ({info,setUser}) => {

  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setUser(null);

  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-20" >
      <div className="row justify-content-center">
        <div>
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-5 text-center">
              
              <h3 className="card-title text-primary">{info.name}</h3>
              <p className="text-muted mb-1">{info.email}</p>
              <p className="text-secondary small">Rol: <strong>{info.role}</strong></p>

              <hr className="my-4" />

              <div className="text-start">
                <p><strong>ID de Usuario:</strong> {info.id}</p>
              </div>

              <button className="btn btn-outline-primary mt-3" onClick={logOut}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

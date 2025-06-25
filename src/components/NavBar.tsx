import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div className="d-flex">
    <div className="bg-dark text-white vh-100 p-3" style={{ width: '200px' }}>
      <h5 className="mb-4">Task Manager</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/task">Tasks</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/project">Projects</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/profile">Profile</Link>
        </li>
        
      </ul>
    </div>

  
  </div>
  )
}

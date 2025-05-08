import React from 'react'
import { Link } from 'react-router-dom'

export const Profile = () => {
  return (
    <div>
      <button className="btn btn-danger">
          <Link className="nav-link text-white" to="/">Log Out</Link>
      </button>
    </div>
  )
}

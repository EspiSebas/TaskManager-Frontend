import React from 'react'
import { Table } from '../components/Table'

export const Projects = () => {
   const urlTask = "http://localhost:3000/project"
      const title = "Projects"
    return (
      <>
      <div className="ms-md-5 ps-md-5">
          <Table url={urlTask} title={title}/>
      </div>
      </>
    )
}

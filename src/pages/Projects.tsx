import React from 'react'
import { Table } from '../components/Table'

export const Projects = () => {
   const urlTask = "http://localhost:3000/project"
      const title = "Projects"
    return (
      <>
      <div>
          <Table url={urlTask} title={title}/>
      </div>
      </>
    )
}

import { Table } from '../components/Table'

export const Task = () => {
    const urlTask = "http://localhost:3000/task-manager"
    const title = "Tasks"
  return (
    
    <div className="ms-md-5 ps-md-5">
      
        <Table url={urlTask} title={title}/>
    </div>
  )
}

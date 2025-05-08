import { Table } from '../components/Table'

export const Task = () => {
    const urlTask = "http://localhost:3000/task-manager"
    const title = "Tasks"
  return (
    <>
    <div>
      
        <Table url={urlTask} title={title}/>
    </div>
    </>
  )
}

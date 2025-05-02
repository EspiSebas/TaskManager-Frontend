import { Table } from '../components/Table'

export const Task = () => {
    const urlTask = "http://localhost:3000/task-manager"
  return (
    <>
    <div>
        <h1>Tasks</h1>
        <Table url={urlTask}/>
    </div>
    </>
  )
}

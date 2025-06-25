import { Table } from '../components/Table'

export const Task = ({info}: {
    url: string;
    title: 'Tasks' | 'Projects';
    info: any;
}) => {
    const urlTask = info.role === "admin" ? ("http://localhost:3000/task-manager") : (`http://localhost:3000/task-manager/developer/${info.id}`)
    const title = "Tasks"
  return (
    
    <div className="ms-md-5 ps-md-5">
        <Table url={urlTask} title={title} info={info}/>
    </div>
  )
}

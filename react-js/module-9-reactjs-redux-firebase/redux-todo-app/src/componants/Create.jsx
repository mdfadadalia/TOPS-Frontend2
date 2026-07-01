import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { create, update } from '../slicer/todoSlicer'

const Create = () => {

    const dispatch = useDispatch()
    const todo = useSelector(state => state.todo)
    const task = useRef()
    const desc = useRef()
    const priority = useRef()
    const duedate = useRef()

    const submitHandler = (e) => {
        e.preventDefault()
        const newArray = {
            task: task.current.value,
            desc: desc.current.value,
            priority: priority.current.value,
            duedate: duedate.current.value
        }
        task.current.value = ""
        desc.current.value = ""
        priority.current.value = ""
        duedate.current.value = ""
        if (todo.editData == null) 
        {
            dispatch(create(newArray))
        }
        else
        {
            dispatch(update(newArray))
        }
    }
    useEffect(() => {
        console.log("Calling UseEffect ")
        console.log(todo.editData)
        if (todo.editData != null) 
        {
            task.current.value = todo.editData.task
            desc.current.value = todo.editData.desc
            priority.current.value = todo.editData.priority
            duedate.current.value = todo.editData.duedate
        }
    }, [todo])
    return <>
        <div className="col-lg-4">
            <div className="card p-4">
                <h4 className="mb-3">
                    <i className="bi bi-plus-circle" />
                    Create Task
                </h4>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label className="form-label">Task Name</label>
                        <input
                            type="text"
                            ref={task}
                            className="form-control"
                            placeholder="Enter task"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                        <textarea className="form-control" ref={desc} rows={4} defaultValue={""} />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Priority</label>
                            <select className="form-select" ref={priority}>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label>Due Date</label>
                            <input type="date" className="form-control" ref={duedate} />
                        </div>
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-add w-100" type='submit'>                            
                            {todo.editData==null?"Create Task" : "Update Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default Create

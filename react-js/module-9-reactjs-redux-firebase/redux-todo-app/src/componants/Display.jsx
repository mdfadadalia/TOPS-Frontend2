import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove } from '../slicer/todoSlicer'

const Display = ({editdata}) => {    
    const todo = useSelector(state => state.todo)
    const dispatch = useDispatch()
    return <>
        <div className="col-lg-8">
            <div className="card p-4">
                <div className="row mb-4">
                    <div className="col-md-7">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search task..."
                        />
                    </div>
                    <div className="col-md-3">
                        <select className="form-select">
                            <option>All</option>
                            <option>Pending</option>
                            <option>Completed</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary w-100">Search</button>
                    </div>
                </div>
                {/* Task */}                
                {todo.map((ele, index) =>
                    <div key={index} className={`card mb-3 task-card priority-low`}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <div className="task-title">{ele.task}</div>
                                    <p className="text-muted mb-2">
                                        {ele.desc}
                                    </p>
                                    <span className="badge bg-info">{ele.duedate}</span>                                   
                                </div>
                                <div className="text-end">
                                     <span className="badge bg-info text-dark">
                                        <small className="text-muted">                                              
                                            {ele.priority}
                                        </small>
                                    </span>
                                    <div className='d-flex gap-3'>
                                    <button className="btn btn-warning btn-sm"  onClick={()=>editdata(ele)} >
                                        <i className="bi bi-pencil" />
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={()=>dispatch(remove(ele))}>
                                        <i className="bi bi-trash" />
                                        Delete
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    </>
}

export default Display

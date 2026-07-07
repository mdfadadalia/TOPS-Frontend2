import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delStudents } from '../features/crud/crudSlice'
import { useMyContext } from '../Context/MyContext'

const Display = () => {
    const dispatch = useDispatch()
    const crud = useSelector((state)=>state.crud)    
    const {editHandler} = useMyContext()   
    if (crud.loading) return <h3 align='center'>Loading.....................</h3>;     
    return <>
        <div className="col-md-8">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Student List</h5>
                        {/* <input
                            type="text"
                            className="form-control w-50"
                            placeholder="Search Student"
                        /> */}
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-hover align-middle">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Phone</th>
                                <th>Age</th>
                                <th width={150}>Action</th>
                            </tr>
                        </thead>
                        <tbody>                                                              
                            {crud.data.map((ele,index)=><tr key={index}>
                                <td>{index+1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.city}</td>
                                <td>{ele.phone}</td>
                                <td>{ele.age}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning" onClick={()=>editHandler(ele.id)}>Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={()=>dispatch(delStudents(ele.id))}>Delete</button>
                                </td>
                            </tr> )}                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export default Display

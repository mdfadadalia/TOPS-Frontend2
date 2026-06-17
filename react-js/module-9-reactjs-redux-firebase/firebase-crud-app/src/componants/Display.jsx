import React, { useContext } from 'react'
import { MyContext } from './MyContext'

const Display = () => {
    const { stud,delData,editData,searchData } = useContext(MyContext)
    
    return (
        <div className="col-md-8">
            <div className="card p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>User List</h3>
                    <input
                        type="text"
                        onKeyUp={e=>searchData(e.target.value)}
                        className="form-control w-50"
                        placeholder="Search user..."
                    />
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th width={180}>Action</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {stud.map((ele, index) => <tr key={index}>
                                <td>{index+1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.email}</td>
                                <td>{ele.phone}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm action-btn" onClick={()=>editData(ele.id)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={()=>delData(ele.id)}>Delete</button>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Display 
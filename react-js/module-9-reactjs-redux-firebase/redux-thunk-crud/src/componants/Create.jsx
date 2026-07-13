import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addStudents, updateStudents } from '../features/crud/crudSlice'
import { useMyContext } from '../Context/MyContext'

const Create = () => {
    const { edit, dispatch, setEdit } = useMyContext()

    const name = useRef()
    const city = useRef()
    const phone = useRef()
    const age = useRef()

    const submitHandler = async (e) => {
        e.preventDefault()
        const data = {
            name: name.current.value,
            city: city.current.value,
            phone: phone.current.value,
            age: age.current.value            
        }        
        if (edit) {          
            data.id = edit.id              
             dispatch(updateStudents(data))                                    
            setEdit()
        }
        else {
             dispatch(addStudents(data))
        }                              
        name.current.value = "";
        city.current.value = "";
        phone.current.value = "";
        age.current.value = "";
    }
    
    useEffect(() => {    
        if (edit) {            
            name.current.value = edit.name
            city.current.value = edit.city
            phone.current.value = edit.phone
            age.current.value = edit.age
        }
    }, [edit])
    return <>
        <div className="col-md-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Student Form</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label className="form-label">Student Name</label>
                            <input
                                type="text"
                                ref={name}
                                className="form-control"
                                placeholder="Enter Name"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                ref={city}
                                className="form-control"
                                placeholder="Enter City"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                ref={phone}
                                className="form-control"
                                placeholder="Enter Phone"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Age</label>
                            <input
                                type="number"
                                ref={age}
                                className="form-control"
                                placeholder="Enter Age"
                            />
                        </div>
                        <div className="d-grid gap-2">
                            {edit ? <button className="btn btn-warning" type='submit'>Update</button> : <button className="btn btn-success" type='submit'>Save Student</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default Create

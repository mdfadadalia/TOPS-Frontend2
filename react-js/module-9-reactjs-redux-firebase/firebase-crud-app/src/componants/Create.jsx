import React, { useContext, useEffect, useRef } from 'react'
import { MyContext } from './MyContext'

const Create = () => {
    const {addData,edit,updateData} = useContext(MyContext)
    const id = useRef()
    const name = useRef()
    const email = useRef()
    const phone = useRef()

    const submitHandler = (e) =>{
        e.preventDefault();
        const newArray = {
            name:name.current.value,
            email:email.current.value,
            phone:phone.current.value
        }
        if(edit != undefined)
        {
            updateData(id.current.value,newArray)
        }
        else
        {
            addData(newArray)
        }        
        id.current.value=""
        name.current.value=""
        email.current.value=""
        phone.current.value=""
    }
    useEffect(()=>{ 
        if(edit!=undefined)
        {
            id.current.value = edit.id
            name.current.value = edit.name,
            email.current.value = edit.email,
            phone.current.value = edit.phone
        }
    },[edit])
  return (
    <div className="col-md-4">
          <div className="card p-4">
            <h3 className="mb-4 text-center">Add User</h3>
            <form onSubmit={submitHandler}>
                <input type="hidden" ref={id} />
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  ref={name}
                  className="form-control"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  ref={email}
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  ref={phone}
                  className="form-control"
                  placeholder="Enter mobile"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                {  edit!=undefined ? "Update User":"Save User" }
              </button>
            </form>
          </div>
        </div>
  )
}

export default Create

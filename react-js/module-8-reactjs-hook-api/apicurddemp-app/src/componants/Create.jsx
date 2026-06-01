import { useContext, useRef } from "react";
import { Navigate, NavigationType, useNavigate } from "react-router-dom";
import { MyContext } from "./MyContext";

export const Create = () => {

    const {DispatchSate} = useContext(MyContext)

    const name = useRef()
    const price = useRef()
    const qty = useRef()

    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();      
        const data = {
            name : name.current.value,
            price : price.current.value,
            qty : qty.current.value
        }
        DispatchSate({type:"ADD",payload:data})
        navigate("/")  
        // window.location.href = "/";
    }
    return <>
        {/* Form Section */}
        <div className="col-md-4">
            <div className="card p-4">
                <h3 className="mb-4 text-center">Add User</h3>
                <form onSubmit={submitHandler}>
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
                            ref={price}
                            className="form-control"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mobile</label>
                        <input
                            type="text"
                            ref={qty}
                            className="form-control"
                            placeholder="Enter mobile"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Save User
                    </button>
                </form>
            </div>
        </div>
    </>
}
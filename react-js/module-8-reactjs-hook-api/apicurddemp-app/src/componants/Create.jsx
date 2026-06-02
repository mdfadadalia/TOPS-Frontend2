import { useContext, useEffect, useRef } from "react";
import { Navigate, NavigationType, useNavigate } from "react-router-dom";
import { MyContext } from "./MyContext";

export const Create = () => {

    const { Add_data, editState } = useContext(MyContext)

    const name = useRef()
    const price = useRef()
    const qty = useRef()

    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        var data = []
        if (editState != undefined) {
             data = {
                id : editState.id,
                name: name.current.value,
                price: price.current.value,
                qty: qty.current.value
            }
        }
        else {
             data = {
                name: name.current.value,
                price: price.current.value,
                qty: qty.current.value
            }
        }
        Add_data(data, "UPDATE")
        navigate("/")
    }
    useEffect(() => {
        if (editState != undefined) {
            name.current.value = editState.name
            price.current.value = editState.price
            qty.current.value = editState.qty
        }
    }, [editState])
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
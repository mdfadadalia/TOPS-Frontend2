import { studentContext } from './studentContext'
import { useContext, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router'

export default function Create() {
    const { state, dispatchStudData } = useContext(studentContext);
    const name = useRef()
    const phone = useRef()
    const city = useRef()
    const navigate = useNavigate()
    const saveHandler = (e) => {
        e.preventDefault()
        if(name.current.value=="")
        {
            alert("Blank Record can't Add");
        }
        else
        {
            var newData = {
                name: name.current.value,
                phone: phone.current.value,
                city: city.current.value
            }
            dispatchStudData({ type: "ADD", data: newData })     
            alert("Record Added Sucessfully")                 
            name.current.value = ""
            phone.current.value = ""
            city.current.value = ""
            navigate("/")
        }
    }

    useEffect(()=>{
        name.current.value = ""
        phone.current.value = ""
        city.current.value = ""
    })
    return (
        <form onSubmit={saveHandler}>
        <div className="row g-3">
            <div align="right">
                <Link to={"/"} className="btn btn-success px-4">VIEW</Link>
            </div>
            <hr />            
                <div className="col-md-4">
                    <label className="form-label">Student Name</label>
                    <input
                        type="text"
                        ref={name}
                        className="form-control"
                        placeholder="Enter Name"
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="text"
                        ref={phone}
                        className="form-control"
                        placeholder="Enter Phone"
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">City</label>
                    <input
                        type="text"
                        ref={city}
                        className="form-control"
                        placeholder="Enter City"
                    />
                </div>
                <div className="mt-4 d-flex gap-3">
                    <button className="btn btn-success px-4">SAVE</button>
                    <button className="btn btn-primary px-4">UPDATE</button>
                    <button className="btn btn-secondary px-4">CLEAR</button>
                </div>            
        </div >
        </form>
    )
}

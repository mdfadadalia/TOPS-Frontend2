import { useContext } from "react"
import { Link } from "react-router-dom"
import { MyContext } from "./MyContext"
import { List } from "./List"

export const Display = () => {
    const {state,Search_data} = useContext(MyContext)       
    return <>
        {/* Table Section */}
        <div className="col-md-8">
            <div className="card p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Product List</h3>
                    <input
                        type="text"
                        onChange={(e)=>Search_data(e.target.value)}
                        className="form-control w-50"
                        placeholder="Search user..."
                    />
                    <Link to="/create" className="btn btn-success">ADD NEW</Link>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th width={180}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Static Data */}
                            {state.map((ele) => <List key={ele.id} ele={ele} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}
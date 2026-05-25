import React, { useContext } from 'react'
import List from './List'
import { Link } from 'react-router'
import { studentContext } from './studentContext'

export default function Display() {
const {state,dispatchStudData} = useContext(studentContext)
  return (
    <div className="table-responsive">
        <div align="right">
            <Link to={"/create"} className="btn btn-success px-4">ADD NEW</Link>
        </div>
        <hr/>
        <table className="table table-bordered table-hover align-middle text-center">
          <thead>
            <tr>              
              <th>Name</th>
              <th>Phone</th>
              <th>City</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>            
            {state.studData?.length>0? state.studData.map((e)=><List key={e.name} ele={e}/>) : <tr><td colSpan={5}>No Data Found</td></tr>}            
          </tbody>
        </table>
      </div>
  )
}

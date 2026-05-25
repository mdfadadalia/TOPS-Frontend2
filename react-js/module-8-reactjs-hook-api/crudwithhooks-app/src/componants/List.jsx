import React, { useContext } from 'react'
import { studentContext } from './studentContext'

export default function List({ ele }) {
    const {state,dispatchStudData} = useContext(studentContext)

    return (
        <tr>
            <td>{ele.name}</td>
            <td>{ele.phone}</td>
            <td>{ele.city}</td>
            <td>
                <button className="btn btn-warning btn-sm btn-action" onClick={()=>dispatchStudData({type:"EDIT",data:ele})}>
                    Edit
                </button>
            </td>
            <td>
                <button className="btn btn-danger btn-sm btn-action" onClick={()=>dispatchStudData({type:"DEL",data:ele})}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

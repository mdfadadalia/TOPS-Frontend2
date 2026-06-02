import { useContext } from "react"
import { MyContext } from "./MyContext"

export const List = ({ ele }) => {
    const {Delete_data,Edit_data} = useContext(MyContext)
    return <>
        <tr>
            <td>{ele.id}</td>
            <td>{ele.name}</td>
            <td>{ele.price}</td>
            <td>{ele.qty}</td>
            <td>
                <button className="btn btn-warning btn-sm action-btn" onClick={()=>Edit_data(ele)}>
                    Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={()=>Delete_data(ele.id)}>Delete</button>
            </td>
        </tr>
    </>

}
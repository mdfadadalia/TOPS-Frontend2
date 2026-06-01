export const List = ({ ele }) => {
    return <>
        <tr>
            <td>{ele.id}</td>
            <td>{ele.name}</td>
            <td>{ele.price}</td>
            <td>{ele.qty}</td>
            <td>
                <button className="btn btn-warning btn-sm action-btn">
                    Edit
                </button>
                <button className="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>
    </>

}
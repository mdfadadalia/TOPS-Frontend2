import React, { useContext } from 'react'
import List from './List'
import { MyContext } from './MyContext'
import { Link } from 'react-router-dom'

export default function Display() {
    const { state } = useContext(MyContext)
    return <>
        <div className="card border-0 shadow-sm rounded-4 mb-5">
            <div className='card-body p-4 bg-light' >
                <h3 className="fw-bold mb-4 text-primary">
                    <i className="bi bi-card-list me-2" />
                    Display New Post
                    <div className="text-end">
                        <Link to={"/"} >
                            <button className="btn btn-warning btn-lg px-5">
                                <i className="bi bi-display me-2" />
                                Create Post
                            </button>
                        </Link>
                    </div>
                </h3>
                <div className="row g-4">
                    {/* POST 1 */}                    
                    {state.map(e => <List key={e.username} ele={e} />)}
                </div>
            </div>
        </div>
    </>
}

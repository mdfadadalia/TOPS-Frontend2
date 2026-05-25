import React, { useContext, useRef } from 'react'
import { MyContext } from './MyContext'
import { Link } from 'react-router-dom'

export default function Create() {

    const { addPost } = useContext(MyContext)
    const username = useRef()
    const category = useRef()
    const title = useRef()
    const description = useRef()

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            username: username.current.value,
            category: category.current.value,
            title: title.current.value,
            description: description.current.value,
            likes: 0
        }
        addPost(data)
    }
    return (
        <div className="card border-0 shadow-sm rounded-4 mb-5">
            <div className="card-body p-4">
                <h3 className="fw-bold mb-4 text-primary">
                    <i className="bi bi-pencil-square me-2" />
                    Create New Post
                    <div className="text-end">
                        <Link to={"/display"} >
                            <button className="btn btn-info btn-lg px-5">
                                <i className="bi bi-send me-2" />
                                View Post
                            </button>
                        </Link>
                    </div>
                </h3>
                <form onSubmit={submitHandler}>
                    <div className="row">
                        {/* USERNAME */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Username</label>
                            <input
                                type="text"
                                ref={username}
                                className="form-control form-control-lg"
                                placeholder="Enter username"
                            />
                        </div>
                        {/* CATEGORY */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Category</label>
                            <input
                                type="text"
                                ref={category}
                                className="form-control form-control-lg"
                                placeholder="Enter Category"
                            />
                        </div>
                    </div>
                    {/* POST TITLE */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Post Title</label>
                        <input
                            type="text"
                            ref={title}
                            className="form-control form-control-lg"
                            placeholder="Enter post title"
                        />
                    </div>
                    {/* POST DESCRIPTION */}
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Post Description</label>
                        <textarea
                            className="form-control"
                            ref={description}
                            rows={5}
                            placeholder="Write your post..."
                            defaultValue={""}
                        />
                    </div>
                    {/* BUTTON */}
                    <div className="text-end">
                        <button type='submit' className="btn btn-primary btn-lg px-5">
                            <i className="bi bi-send me-2" />
                            Publish Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

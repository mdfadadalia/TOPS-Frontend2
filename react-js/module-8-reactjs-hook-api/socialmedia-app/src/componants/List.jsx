import React, { useContext } from 'react'
import { MyContext } from './MyContext'

export default function List({ele}) {
    const {delPost,addLikes} = useContext(MyContext)
  return (
    <div className="col-lg-4 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              {/* TOP */}
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    className="
              bg-primary
              text-white
              rounded-circle
              d-flex
              align-items-center
              justify-content-center
              fw-bold
            "
                    style={{ width: 55, height: 55 }}
                  >
                    {ele.username.charAt(0)}
                  </div>
                  <div className="ms-3">
                    <h5 className="mb-1 fw-bold">{ele.username}</h5>
                    <span className="badge text-bg-primary">{ele.category}</span>
                  </div>
                </div>                
              </div>
              {/* CONTENT */}
              <div className="mt-4">
                <h4 className="fw-bold mb-3">{ele.title}</h4>
                <p className="text-secondary p-2"  style={{ textAlign: "justify" }}>
                  {ele.description}
                </p>
              </div>
            </div>
            {/* FOOTER */}
            <div
              className="
        card-footer
        bg-white
        border-0
        d-flex
        justify-content-between
        align-items-center
      "
            >
              <button className="btn btn-light rounded-pill px-4 bg-info" onClick={e=>addLikes(ele)}>
                <i className="bi bi-heart me-2" />
                {ele.likes} Likes 
              </button>
              <button className="btn btn-light rounded-pill px-4 bg-danger" onClick={e=>delPost(ele)}>
                <i className="bi bi-trash-fill me-2" />
                Del Post
              </button>              
            </div>
          </div>
        </div>        
  )
}

import React from 'react'
import Create from './componants/Create'
import Display from './componants/Display'

const App = () => {
  return <>
    <nav className="navbar navbar-dark">
      <div className="container">
        <h3 className="text-white">
          <i className="bi bi-check2-square" />
          My Todo List
        </h3>
      </div>
    </nav>
    <div className="container mt-4">
      <div className="row">

        {/* Left Panel */}
        <Create/>

        {/* Right Panel */}
        <Display/>

      </div>
    </div>


  </>
}

export default App

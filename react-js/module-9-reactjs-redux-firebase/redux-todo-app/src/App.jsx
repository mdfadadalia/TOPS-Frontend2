import React, { useState } from 'react'
import Create from './componants/Create'
import Display from './componants/Display'
import { useSelector } from 'react-redux'

const App = () => {
  const todo = useSelector(state => state.todo)
  const [edittask, setEditTask] = useState()
  const editdata = (data) => {
    const newArray = todo.find(ele => ele.task == data.task)
    setEditTask(newArray)
  }
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
        <Create edittask={edittask} />

        {/* Right Panel */}
        <Display editdata={editdata} />

      </div>
    </div>


  </>
}

export default App

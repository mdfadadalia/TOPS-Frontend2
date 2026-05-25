import 'bootstrap/dist/css/bootstrap.min.css'
import Title from './componants/Title'
import { Outlet } from 'react-router'
import { studentContext } from './componants/studentContext'
import { useReducer } from 'react'
const initilize = {studData:[],editData:null}
const App = () =>{
  const studReducer = (state,action) =>{
      switch(action.type)
      {
        case "ADD":          
          state.studData = [...state.studData,action.data]          
          break
        case "EDIT":

          break
        case "UPDATE":
          break
        case "DEL":          
          state.studData = state.studData.filter(e=>e.name!=action.data.name)
          break
        case "VIEW":
          break        
      }
      return state
  }
  const [state,dispatchStudData] = useReducer(studReducer,initilize)
  return <>
    <div className="container py-5">
    <div className="card main-card p-4">
      <Title/>      
      <studentContext.Provider value={{state,dispatchStudData}}>
          <Outlet/>      
      </studentContext.Provider>      
    </div>
  </div>
  </>
}
export default App
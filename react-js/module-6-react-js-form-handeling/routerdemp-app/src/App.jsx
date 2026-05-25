import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet } from "react-router-dom"
import Nav from "./componants/Nav"
const App = () => {
  return <>
    <div className="container">
      <Nav className="nav" />
      <div className="card shadow-lg border-0 rounded-4 w-100" children={<Outlet/>} />                
    </div>
  </>
}
export default App


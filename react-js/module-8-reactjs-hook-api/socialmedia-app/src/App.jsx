import { Outlet } from "react-router-dom"
import Header from "./componants/Header"
import ContextProvider from "./componants/MyContext"

const App = () => {
  return <>
    <ContextProvider>
      <div className="container py-5">        
        <Header />        
        <Outlet/>
      </div>
    </ContextProvider>
  </>
}
export default App
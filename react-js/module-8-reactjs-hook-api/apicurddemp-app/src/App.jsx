import { Outlet } from "react-router-dom"
import { Container } from "./componants/Container"
import { MyContextProvider } from "./componants/MyContext"


const App = () => {
  return <>
    <Container>
      <MyContextProvider>
        <Outlet />
      </MyContextProvider>
    </Container>
  </>
}
export default App
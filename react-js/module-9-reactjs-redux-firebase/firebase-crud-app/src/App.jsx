import React from 'react'
import Create from './componants/Create'
import Display from './componants/Display'
import { Container } from './componants/Container'
import { MyContextProvider } from './componants/MyContext'
import { ToastContainer } from 'react-toastify'

function App() {
  return <>
  <MyContextProvider>
    <Container>
      <Create />
      <Display />
      <ToastContainer/>
    </Container>
    </MyContextProvider>

  </>
}

export default App

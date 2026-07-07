import React, { useEffect } from 'react'
import Create from './componants/Create'
import Display from './componants/Display'
import Container from './componants/Container'
import { useDispatch } from 'react-redux'
import { FetchStudents } from './features/crud/crudSlice'
import MyContextProvider from './Context/MyContext'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(FetchStudents())
  }, [])
  return <>
    <MyContextProvider>
      <Container>
        <Create />
        <Display />
      </Container>
    </MyContextProvider>
  </>
}

export default App

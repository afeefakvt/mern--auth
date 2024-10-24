import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/header'

const App = () => {
  return (
    <>
    <Header/>
   <Container className='my-2'>
    <Outlet/>
   </Container>
    </>
  )
}

export default App
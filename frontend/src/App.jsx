import React from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header'
import { useDispatch } from 'react-redux';
import { setAdminCredentials } from './features/adminAuthSlice';

const App = () => {
  const location = useLocation();
  
 
    // Determine if the current path is the admin login route
    const isAdminLogin = location.pathname === '/admin/login' ; 

  return (
    <>
    {!isAdminLogin && <Header />} 
    <ToastContainer/>
   <Container className='my-2'>
    <Outlet/>
   </Container>
    </>
  )
}

export default App
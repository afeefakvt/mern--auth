import React,{useEffect, useState} from 'react'
import { Button, Container, Form} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdminLoginMutation } from '../features/adminApiSlice';
import { setAdminCredentials } from '../features/adminAuthSlice';




const AdminLogin = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [adminLogin] = useAdminLoginMutation();
    const {adminInfo} =useSelector((state)=>state.adminAuth)

    useEffect(()=>{
        if(adminInfo){
            navigate('/admin/dashboard')
        }
    },[navigate,adminInfo])


    const handleSubmit= async (e)=>{
        e.preventDefault()
      try {
        const res = await adminLogin({email,password}).unwrap();
        console.log(res,'dsaas');
        
        dispatch(setAdminCredentials(res));
        // navigate('/admin/dashboard')
       
      } catch (error) {
        toast.error(error?.data?.message || 'login failed')
    }
}

   
    return(
        <FormContainer >
            <h2>admin login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='enter email'
                    value={email} onChange={(e)=>setEmail(e.target.value)} required/>

                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='enter password'
                    value={password} onChange={(e)=>setPassword(e.target.value)} required/>

                </Form.Group>
                <Button type='submit' variant='primary' className='mt-3'>Login</Button>
            </Form>
        </FormContainer>
    )
   
}

export default AdminLogin
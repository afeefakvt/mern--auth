import React, { useState,useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Form,Col,Row,Button, FormGroup } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch,useSelector } from 'react-redux'
import { useLoginMutation } from '../features/usersApiSlice'
import { setCredentials } from '../features/authSlices'
import { toast } from 'react-toastify';


const LoginScreen = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login,{isLoading}] = useLoginMutation();

    const {userInfo} =useSelector((state)=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo]);

    const submitHandler = async(e)=>{
        e.preventDefault();
       try {
        const res = await login({email, password}).unwrap();
        console.log('Login Response:', res); // Check the login response

        dispatch(setCredentials({...res}));
        navigate('/')
       } catch (err) {
        console.error('Login Error:', err); // Log error to inspect

        toast.error(err?.data?.message||err.error);
        
        
       }    
        
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                </Form.Control>

            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}>
                </Form.Control>

            </Form.Group>
            <Button disabled={isLoading} type='submit' variant='primary' className='mt-3'>
                Sign In
            </Button>

        </Form>
        <Row className='py-3'>
            <Col>
            New Costumer? <Link to={'/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>

  )
}

export default LoginScreen
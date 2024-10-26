import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddUserMutation } from '../features/adminApiSlice'
import { Form,Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const AddUserScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const [addUser] = useAddUserMutation()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            await addUser({name,email,password}).unwrap();
            navigate('/admin/users')
        } catch (error) {
            console.error("Error adding user:", error);
            
        }
    }
  return (
    <FormContainer>
            <h2>Add New User</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-2' controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className='my-2' controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className='mt-3'>
                    Add User
                </Button>
            </Form>
    
        </FormContainer>

  )
}

export default AddUserScreen
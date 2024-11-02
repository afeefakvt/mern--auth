import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddUserMutation } from '../features/adminApiSlice'
import { Form,Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'; 


const AddUserScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const [addUser] = useAddUserMutation()

    const handleSubmit = async(e)=>{
        e.preventDefault();


        if (!name.trim()) {
            toast.error('Name cannot be empty or whitespace.'); 
            return;
        }
        if (!password.trim()) {
            toast.error('Password cannot be empty or whitespace.'); 
            return;
        }
        try {
            await addUser({name,email,password}).unwrap(); //unwrap method is used to return the result directly or throw an error if the promise is rejected.
            toast.success('User added successfully!'); 

            navigate('/admin/userList')
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error('Failed to add user. Please try again.'); 

            
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
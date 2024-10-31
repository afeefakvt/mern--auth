import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button,Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useUpdateUserMutation,useGetUserQuery } from '../features/adminApiSlice'



function EditUserscreen() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const {data:user,isLoading} = useGetUserQuery(id);
    const [updateUser]  = useUpdateUserMutation()

    useEffect(()=>{ 
        if(user){
            setName(user.name)
            setEmail(user.email)
        }
    },[user])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            if (!name || !email) {
                alert("Please fill in both name and email.");
                return;
            }
            await updateUser({id,name,email}).unwrap()
            navigate('/admin/userList')
        } catch (error) {
            console.error('Error updating user:', error);

            
        }
    }

  return (
    <FormContainer>
        <h2>Edit User</h2>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

         <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-3">
                    Update
                </Button>


        </Form>
    </FormContainer>
  )
}

export default EditUserscreen
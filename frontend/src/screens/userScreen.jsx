import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Button,Modal,Table } from 'react-bootstrap'
import { useDeleteUserMutation } from '../features/adminApiSlice'
import { LinkContainer } from 'react-router-bootstrap';




const UserScreen = () => {
    const [users,setUsers] = useState([]);
    const [deleteUser] = useDeleteUserMutation()



    useEffect(()=>{
        //fetch users from api
        const fetchUsers = async()=>{
            try {
                const {data} = await axios.get('/api/admin/userList',{ 
                    withCredentials: true //includes cookies with request   
                })
                console.log('Fetched users:', data); // Log the data here

                setUsers(data)
            } catch (error) {
                console.error('Error fetching users:', error);
                
            }
        }
        fetchUsers()
    },[])


    const handleDelete = async(userId)=>{
        try {
            await deleteUser(userId).unwrap();
            setUsers(users.filter((user)=>user._id!==userId))
            console.log('user deleted');
            
        } catch (error) {
            console.error('error deleting user:',error)
            
        }
    }
  return (
    <div className='container mt-4'>
        <h2>Users</h2>
        <Table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>(
                    <tr key={user._id}>
                        <td>
                            <img
                              src={user.image || '/default-avatar.png'}
                              alt='User avtar'
                              style={{width:'50px',borderRadius:'50%'}}
                              />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>        
                            <LinkContainer to={`/admin/editUser/${user._id}`}>
                            <Button className='mx-1' variant='warning'>
                                edit
                            </Button></LinkContainer>
                           
                            <Button variant='danger' onClick={()=>handleDelete(user._id)}>
                                Delete
                            </Button>
                        </td>
                        

                    </tr>

                ))}
            </tbody>
        </Table>

    </div>

)
}

export default UserScreen
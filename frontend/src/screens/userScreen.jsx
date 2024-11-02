import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Button,Modal,Table,Form } from 'react-bootstrap'
import { useDeleteUserMutation } from '../features/adminApiSlice'
import { toast } from 'react-toastify';





const UserScreen = () => {
    const [users,setUsers] = useState([]);
    const [searchQuery,setSearchQuery] = useState('')
    const [deleteUser] = useDeleteUserMutation()

    //modal state
    const [showModal,setShowModal] = useState(false)
    const [selectedUser,setSelectedUser] = useState({name:"",email:"",_id:""})

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

    const handleEdit = (user)=>{
        setSelectedUser(user)
        setShowModal(true)
    }
    const handleClose = ()=>{
        setShowModal(false)
        setSelectedUser({name:"",email:"",_id:""}) //reset user state
    }

        const validateInput = (name, email) => {
        if (!name.trim() || !email.trim()) {
            return 'Fields cannot be empty or contain only spaces.';
        }
        if (name.startsWith(' ') || email.startsWith(' ')) {
            return 'Fields cannot start with spaces.';
        }
        return null; // No errors
    };

    const handleSubmit = async(e)=>{
        e.preventDefault()

          const errorMessage = validateInput(selectedUser.name, selectedUser.email);
        if (errorMessage) {
            toast.error(errorMessage); // Show error message in toast
            return;
        }

        try {
            const {data} = await axios.put(`/api/admin/editUser/${selectedUser._id}`,{
                name:selectedUser.name,
                email:selectedUser.email
            },{withCredentials:true})

            //update users list
            setUsers(users.map(user=>(user._id===data._id?data:user)))
            handleClose(); //close the modAL
        } catch (error) {
            console.error('Error updating user:', error);

            
        }
    }

    //filter users
    const filteredUsers = users.filter((user)=> user.name.toLowerCase().includes(searchQuery.toLowerCase()))

    
  return (
    <div className='container mt-4'>
        <h2>Users</h2>

        <Form className='mb-4 mt-4'>
            <Form.Group controlId='search'>

                <Form.Control type='text' placeholder='search by name...' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>

            </Form.Group>

        </Form>
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>

                {filteredUsers.map((user)=>(
                    <tr key={user._id}>
                        
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>        
                            <Button className='mx-1' variant='warning' onClick={()=>handleEdit(user)}>
                                edit
                            </Button>
                           
                            <Button variant='danger' onClick={()=>handleDelete(user._id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>

                ))}
            </tbody>
        </Table>

        {/* modal */}
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formUserName'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={selectedUser.name}
                                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='formUserEmail'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={selectedUser.email}
                                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit' className='mt-3'>
                            Save Changes
                        </Button>

                </Form>
            </Modal.Body>

        </Modal>

    </div>

)
}

export default UserScreen
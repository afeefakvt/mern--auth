import React from 'react'
import { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Form,Button,FormGroup,FormLabel} from 'react-bootstrap'
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../features/usersApiSlice';
import { setCredentials } from '../features/authSlices';
import defaultAvatar from '../assets/Simple pfp.jpeg'; // Ensure this path is correct



const Profile = () => {

    const [email,setEmail] =useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate()


    const {userInfo} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const [updateProfile,{isLoading}] = useUpdateUserMutation();

    useEffect(()=>{
        setName(userInfo.name);
        setEmail(userInfo.email);
    },[userInfo.name,userInfo.email])

    const submitHandler =async(e)=>{
        e.preventDefault()
    if(password!==confirmPassword){
        toast.error('Passwords do not match')
    }else{
        try {
            const res = await updateProfile({
                _id:userInfo._id,
                name,
                email,
                image,
                password
            }).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/')
            toast.success('profile updated successfully')
        } catch (error) {
            toast.error(err?.data?.message || err.error)
            
        }
    }        
    }



    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     if (password !== confirmPassword) {
    //         toast.error('Passwords do not match');
    //     } else {
    //         const formData = new FormData();
    //         formData.append('_id', userInfo._id);
    //         formData.append('name', name);
    //         formData.append('email', email);
    //         formData.append('password', password);
    //         if (image) {
    //             formData.append('image', image); // Append the image file
    //         }

    //         try {
    //             const res = await updateProfile(formData).unwrap();
    //             dispatch(setCredentials({ ...res }));
    //             toast.success('Profile updated successfully');
    //         } catch (error) {
    //             toast.error(error?.data?.message || error.error);
    //         }
    //     }
    // };

  return (

    <FormContainer>
        <h1>Update Profile</h1>
             <img
                    src={image ? URL.createObjectURL(image) : defaultAvatar}
                    alt="Profile"
                    className="rounded-circle"
                    width="130"
                    height="130"
                />

        <Form onSubmit={submitHandler}>
            <FormGroup className='my-2' controlId='name'>
                <FormLabel>Name</FormLabel>
                <Form.Control type='name' placeholder='enter name' value={name}
                onChange={(e)=>setName(e.target.value)}>

                </Form.Control>

            </FormGroup>
            <FormGroup className='my-2' controlId='email'>
                <FormLabel>Email</FormLabel>
                <Form.Control type='email' placeholder='enter email' value={email}
                onChange={(e)=>setEmail(e.target.value)}>

                </Form.Control>

            </FormGroup>
            <FormGroup className='my-2' controlId='image'>
                    <FormLabel>Profile Image</FormLabel>
                    <Form.Control
                        type='file'
                        accept='image/*'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </FormGroup>
            <FormGroup className='my-2' controlId='password'>
                <FormLabel>Password</FormLabel>
                <Form.Control type='password' placeholder='enter password' value={password}
                onChange={(e)=>setPassword(e.target.value)}>

                </Form.Control>

            </FormGroup>
            <FormGroup className='my-2' controlId='confirmPassword'>
                <FormLabel>Confirm Password</FormLabel>
                <Form.Control type='password' placeholder='confirm password' value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}>

                </Form.Control>

            </FormGroup>
            <Button type='submit' variant='primary' className='mt-3'>
                Update
            </Button>
        </Form>
        {userInfo.image && (
                <img
                    src={userInfo.image}
                    alt='Profile'
                    style={{ width: '100px', borderRadius: '50%', marginTop: '20px' }}
                />
            )}


    </FormContainer>
  )
}

export default Profile
import generateToken from "../utils/generateToken.js";
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'


//@desc Auth user/set token
//route POST/api/admin/login
//@access Public

const authAdmin = async(req,res)=>{
    try {
        const credentials = {
            email:'admin@gmail.com',
            password:123456
        }

        const {email,password} = req.body

        if(email===credentials.email&& password==credentials.password){
            const adminUser = {
                
                name:'admin',
                email:credentials.email
            }
            generateToken(res,adminUser._id)
            res.status(201).json({
                _id:adminUser._id,
                name:adminUser.name,
                email:adminUser.email
            })
        }else{
            res.status(401).json({message:'invalid email or password'})
        }
        
    } catch (error) {
        res.status(500).json({message:'error occured'})
        console.log(error.message);
        
        
    }
}

//@desc logout user
//route POST/api/admin/logout
//@access Public

const amdinLogout = async (req,res)=>{
    try {

        res.cookie('jwt','',{
            httpOnly: true,
            expires : new Date(0)
        })
        res.status(200).json({message:'logged out'})
    } catch (error) {
        res.status(500).json({message:'error occured'})
        console.log(error.message);
    }
}


const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash
    } catch (error) {
        console.log(error.message);


    }
}
const registerUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body
        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(401).json({message:'user already exists'})
        }

        const spassword = await securePassword(password)

        const user  = await User.create({
            name,
            email,
            password:spassword
        })

        if(user){
            generateToken(res,user._id)
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email
            })
        }else{
            res.status(401).json({message:'invalid user data'})
        }
    } catch (error) {
    res.status(500).json({message:'error occured'})
    console.log(error.message);
        
    }
}
 
//route GET/api/admin/users

const getUsers = async(req,res)=>{
    try {
        console.log("dgaschgavshzxnb ");
        
        const users = await User.find()
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({message:'error occured'})
        console.log(error.message);
    }
}


const getSingleUser = async (req,res)=>{
    try {
       const user = await User.findById(req.params.id)
       if(user){
        res.json(user)
       }else{
            res.status(404).json({message:'user not found'})
       }

    } catch (error) {
        res.status(500).json({message:'error occured'})
        console.log(error.message);
        
    }
}


const updateUser  =async (req,res)=>{
    try {

        const id= req.params.id
        const user = await User.findOne({_id:id})

        if(user){
            user.name = req.body.name||user.name
            user.email = req.body.email||user.email
            // if(req.body.password){
            //     const salt = await bcrypt.genSalt(10);
            //     user.password=await bcrypt.hash(req.body.password,salt)
            // }
            // if(req.body.image){
            //     const image = req.body.image
            //     user.image = image
            // }
            const updatedUser = await user.save()
            res.status(201).json({
                _id:updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                // image:updatedUser.image
            })
        }else{
            res.status(401).json({message:'user not found'})
        }

    } catch (error) {
        res.status(500).json({message:'error occured'})
        console.log(error.message);
        
    }
}
const deleteUser = async(req,res)=>{
    try {
        const id  = req.params.id
        const user = await User.findByIdAndDelete(req.params.id);

        if(user){
            res.status(201).json({message:'user deleted'})
            
        }else{
            res.status(404).json({message:'user not found'})
        }
    } catch (error) {
        res.status(401).json({message:'error occures'})
        console.log(error);
        
    }
}

export{
    authAdmin,
    amdinLogout,
    getUsers,
    getSingleUser,
    updateUser,
    registerUser,
    deleteUser
}
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'




const authUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log('Received email:', email);
        console.log('Received password:', password); 
        const user = await User.findOne({ email })

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
            res.status(201).json({ _id: user._id, name: user.name, email: user.email })
        } else {
            res.status(401).json({ message: 'incorrect email or password' })
        }



    } catch (error) {
        res.status(500).json({ message: 'error occured' })
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

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name.trim() || !email.trim() || !password.trim()) {
            res.status(400).json({ message: 'fields cannot be empty' });
            return;
        }
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({message:'user already exists'})
            return;
        }
        const spassword = await securePassword(password)
        const user = new User({
            name,
            email,
            password: spassword
        })

        const userData = await user.save()

        if (userData) {
            generateToken(res, userData._id)
            res.status(201).json({ message: "User registered successfully", data: userData });

        } else {
            res.status(400);
            throw new Error('invalid user data')
        }
    } catch (error) {
        res.status(500).json({ message: 'error occured' })
        console.log(error.message);
    }
}
const logoutUser = async (req, res) => {
    try {
        res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0)
        })
        res.status(201).json({ message: 'user logged out' })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error.message);

    }
}

const getUserProfile = async (req, res) => {
    try {
        const user ={
            _id:req.user._id,
            name:req.user.name,
            email:req.user.email,
        }
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error);

    }
}
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            
            if (req.file) {
                user.image = req.file.path; // Assuming you save the path in the user model
            }
            if(req.body.password){
                const salt  = await bcrypt.genSalt(10);
                user.password =await bcrypt.hash(req.body.password,salt)
            }

            const updatedUser = await user.save()

            res.status(200).json({
                _id:updatedUser._id,
                name: updatedUser.name,
                email:updatedUser.email,
                image:updatedUser.image

            });
        }else{
            res.status(404);
            throw new Error('user not found')
        }

    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error);

    }
}

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
}
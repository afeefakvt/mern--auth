import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler';

const protect  = asyncHandler(async(req,res,next)=>{
    let token;

    console.log(req.cookies,"jnikjikj"); // Check if cookies are being received properly
    token = req.cookies.jwt; // Get token from cookies


    if(token){
        try {
           const decoded = jwt.verify(token,process.env.JWT_SECRET);
           
           req.user = await User.findById(decoded.userId).select('-password');
           next()
        } catch (error) {
            res.status(401);
            throw new Error ('not authorized, invalid token')
        }
    }else{
        res.status(401)
        throw new Error('not authorized ,no token');
    }
})


export {protect};
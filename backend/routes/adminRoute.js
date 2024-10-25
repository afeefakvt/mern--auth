import express from 'express'

const router = express.Router()

import { 
    authAdmin,
    amdinLogout,
    getUsers,
    getSingleUser,
    registerUser,
    updateUserProfile,
    deleteUser

 } from '../controllers/adminController.js'


 import {protect} from '../middleware/authMiddleware.js'
 import upload from '../middleware/multer.js'

 router.post('/login',authAdmin);
 router.post('/logout',amdinLogout);
 router.post('/newUser',registerUser);
 router.get('/userList',protect,getUsers);
 router.get('/editUser/:id',protect,getSingleUser);
 router.put('/editUser/:id',protect,upload.single('image'),updateUserProfile);
 router.delete('/deleteUser/:id',protect,deleteUser)

 
export default router;        




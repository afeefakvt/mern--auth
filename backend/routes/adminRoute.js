import express from 'express'
import {protect} from '../middleware/authMiddleware.js'


const router = express.Router()

import { 
    authAdmin,
    amdinLogout,
    getUsers,
    getSingleUser,
    registerUser,
    updateUser,
    deleteUser

 } from '../controllers/adminController.js'


 import upload from '../middleware/multer.js'

 router.post('/login',authAdmin);
 router.post('/logout',amdinLogout);
 router.post('/newUser',protect,registerUser);
 router.get('/userList',protect,getUsers);
 router.get('/editUser/:id',protect,getSingleUser);
 router.put('/editUser/:id',protect,updateUser);
 router.delete('/deleteUser/:id',protect,deleteUser)

 
export default router;        




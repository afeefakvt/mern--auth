import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import mongoose from 'mongoose';
import path from 'path';
const port = process.env.PORT || 5000
import userRoutes from './routes/userRoute.js'
import adminRoutes from './routes/adminRoute.js'



const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true})); 

app.use(cookieParser()) // Parse cookies first

app.use('/api/users',userRoutes)// Routes come after
app.use('/api/admin',adminRoutes)


app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));

mongoose.connect(process.env.MONGO_URI )
.then(()=>console.log('mongodb connected'))
.catch(()=>console.log('couldnt connect mongodb'))

app.get('/',(req,res)=>res.send('server started'))

app.use(notFound);
app.use(errorHandler); 

app.listen(port,()=>{
    console.log(`server is running on  http://localhost:${port}`);
    
})  
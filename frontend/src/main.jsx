import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css' 
import App from './App.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import store from './store'
import {Provider} from 'react-redux'
import Profile from './screens/Profile.jsx'
import PrivateRoutes from './components/PrivateRoutes.jsx'
import AdminLogin from './screens/AdminLogin.jsx'
import AdminDashboard from './screens/adminDashboard'
import AddUserScreen from './screens/addUserScreen.jsx'
import UserScreen from './screens/userScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
       <Route index={true} path='/' element={<HomeScreen/>}/>
       <Route path='/login' element={<LoginScreen/>}/>
       <Route path='/register' element={<RegisterScreen/>}/>
       <Route path='/admin/login' element={<AdminLogin/>}/> 


       <Route path='' element={<PrivateRoutes/>}>
        <Route path='/profile' element={<Profile/>}/>
       </Route>

       {/* admin routes */}
       <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
       <Route path='/admin/newUser' element={<AddUserScreen/>}/>
       <Route path='/admin/userList'  element={<UserScreen/>}/>
    </Route>
)
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
  </Provider>

)

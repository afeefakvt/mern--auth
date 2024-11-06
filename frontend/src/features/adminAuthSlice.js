import {createSlice} from '@reduxjs/toolkit';

const initialAdminState = {
    adminInfo:localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo')):null,
 
}


export const adminAuthSlice = createSlice({
    name:'admin',
    initialState:initialAdminState,
    reducers:{
        setAdminCredentials:(state,action)=>{
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        adminLogout:(state)=>{
            state.adminInfo = null
            localStorage.removeItem('adminInfo')
        }
    }
})

export const {setAdminCredentials,adminLogout} = adminAuthSlice.actions

export default adminAuthSlice.reducer
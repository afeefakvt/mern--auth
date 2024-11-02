import { adminLogout } from './adminAuthSlice'
import {apiSlice} from './apiSlice'
const ADMIN_URL = '/api/admin'

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        adminLogin:builder.mutation({
            query:(data)=>({
                url: `${ADMIN_URL}/login`,
                method:'POST',
                body:data,
            })
        }),
        adminLogout:builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/logout`,
                method:'POST'
            })
        }),
        addUser:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/newUser`,
                method:'POST',
                body:data
            }),
        }),
        deleteUser:builder.mutation({
            query:(userId)=>({
                url:`${ADMIN_URL}/deleteUser/${userId}`,
                method:'DELETE',
            }),
        }),
})
})


export const {useAdminLoginMutation,useAdminLogoutMutation,useAddUserMutation,useDeleteUserMutation} = adminApiSlice;
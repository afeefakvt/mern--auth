const authUser = async (req,res)=>{
    try {
        res.status(200).json({message:'auth user'})
    } catch (error) {
        res.status(500).json({message:'error occured'})
        
    }
   
}
export {
    authUser 
}
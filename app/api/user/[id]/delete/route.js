import User from "@/lib/models/User"
import { connectDB } from "@/lib/mongoose"


export const DELETE = async(req, {params}) => {
    try {
        await connectDB()
        await User.findByIdAndDelete(params.id)
        return new Response('User deleted', {status: 200});
         
    }catch (error){
        return new Response('Failed to delete:', error.message, {status: 500})
    }
}



'use server'

import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";

export async function signupAction(formData){
    await connectDB();
    await User.create(formData)
    console.log('formdata:', formData)    
   
}    
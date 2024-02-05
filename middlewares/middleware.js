import { connectDB } from "@/lib/mongoose";
import nextConnect from 'next-connect';


const middleware = nextConnect();
//await connectDB()

middleware.use(connectDB);

export default middleware;

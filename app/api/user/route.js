import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";

export const GET = async (req) => {
  try {
    await connectDB()

    const allUsers = await User.find();

    return new Response(JSON.stringify(allUsers), { status: 200 })
  } catch (err) {
    return new Response("Failed to get all users", { status: 500 })
  }
}     
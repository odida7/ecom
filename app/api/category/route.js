import Categories from "@/lib/models/Categories";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";

export async function POST(request) {
    try {
        await connectDB();

        // Extract userId and category from the request body
        const { userId, category } = await request.json();

        if (!userId || !category) {
            throw new Error('userId and category are required');
        }

        // Check if the user exists
        const user = await User.findById(userId);

        if (!user) {   
            throw new Error('User not found');
        }

        // Create a new category
        const newCategory = new Categories({
            userId,
            category
        });

        // Save the new category to the database
        await newCategory.save();

        // Return the created category data
        return new Response(JSON.stringify(newCategory), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating category:', error);
        throw new Error(`Failed to create category: ${error.message}`);
    }
}


export async function GET(){
    try{
        await connectDB();
        const allCategories = await Categories.find();
          return new Response(JSON.stringify(allCategories), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    }catch(error){
        console.log(error.message)
        return new Response(error.message, {
          status: 500,
        });
    }
}
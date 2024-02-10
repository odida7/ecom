import Categories from "@/lib/models/Categories";
import { connectDB } from "@/lib/mongoose";

//////////////get category

export async function GET(reqest, { params }) {
    const {id} = params;
    console.log('id:', id)
    try {
        await connectDB();
        const category = await Categories.findById(id);
        
        if (!category) {
            // Category not found, return 404 response
            return new Response(JSON.stringify({ error: 'Category not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
                
            });
        }

        // Category found, return 200 response with category data
        return new Response(JSON.stringify(category), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            
        });
    } catch (error) {
        // Handle errors and return 500 response with error message
        console.error(error.message);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
            
        });
    }
}



////////////////////////update catrgory

export const PUT = async(request, {params}) => {
    const {id} = params;
    const {userId, category} = await request.json()
    try{
        await connectDB();
        const updated = await Categories.findByIdAndUpdate(id, {userId, category}, {new: true});
        return new Response(JSON.stringify(updated), {
            status: 200,
            headers: { 'Content-Type': 'application/json'}
        });

    }catch (error) {
        // Handle errors and return 500 response with error message
        console.error(error.message);
        return new Response(error.message, {status: 500}
            );
    }
}



////////////////////////delete catrgory

export const DELETE = async(request, {params}) => {
    const {id} = params;

    try{
        await connectDB();
        await Categories.findByIdAndDelete(id);
        return new Response('Category deleted', {
            status: 200,
        });

    }catch (error) {
        // Handle errors and return 500 response with error message
        console.error(error.message);
        return new Response(error.message, {status: 500}
            );
    }
}
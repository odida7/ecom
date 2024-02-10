
import Products from "@/lib/models/Products";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";


//////////////get product

export async function GET(reqest, { params }) {
    const {id} = params;
    console.log('id:', id)
    try {
        await connectDB();
        const product = await Products.findById(id);
        
        if (!product) {
            // Category not found, return 404 response
            return new Response(JSON.stringify({ error: 'product not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
                
            });
        }

        // Category found, return 200 response with category data
        return new Response(JSON.stringify(product), {
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



////////////////////////update product

export const PUT = async(request, {params}) => {
    const {id} = params;
     
    const {userId, name, price, image, categoryId, desc} = await request.json();
    try{
        await connectDB();
        const user = await User.findById(userId);
        if(user){
            const updated = await Products.findByIdAndUpdate(id, {userId, name, price, image, categoryId, desc}, {new: true});

        return new Response(JSON.stringify(updated), {
            status: 200,
            headers: { 'Content-Type': 'application/json'}
        }); 
        }else{
            return new Response('user required', {
            status: 401
        })
        }
       

    }catch (error) {
        // Handle errors and return 500 response with error message
        console.error(error.message);
        return new Response(error.message, {status: 500}
            );
    }
}



////////////////////////delete product

export const DELETE = async(request, {params}) => {
    const {id} = params;

    try{
        await connectDB();
        await Products.findByIdAndDelete(id);
        return new Response('Product deleted', {
            status: 200,
        });

    }catch (error) {
        // Handle errors and return 500 response with error message
        console.error(error.message);
        return new Response(error.message, {status: 500}
            );
    }
}
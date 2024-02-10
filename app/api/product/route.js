import Categories from "@/lib/models/Categories";
import Products from "@/lib/models/Products";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose"


export const POST = async(request, {params})=>{
   // const {categoryId} = params;
    const {userId, name, price, image, categoryId, desc} = await request.json();
    try{
        await connectDB();
        const category = await Categories.findById(categoryId);
        console.log('category:', category);

        const user = await User.findById(userId);
        console.log('user:', user);

        if(user){
            if(category){
               const newProduct = new Products({
                userId,
                name,
                price,
                image,
                categoryId,
                desc
            })
            await newProduct.save();

            return new Response(JSON.stringify(newProduct), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }) 
            }
            
        }else{
            return new Response('user required', {
            status: 401
        })
        }

    }catch(error){
        console.log(error.message)
        return new Response(error.message, {
            status: 500
        })
    }
}




////////////////get products


export async function GET(){
    try{
        await connectDB();
        const allProducts = await Products.find();
          return new Response(JSON.stringify(allProducts), { 
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
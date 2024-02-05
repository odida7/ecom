import mongoose from "mongoose";


const producSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true, 
    },
    desc: String,  
    
    price: {
        type: Number,
        required: true,
    },
    image: {   
        type: String,
        default: '', 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

},  
   {timestamps: true},
)

const Products = mongoose.models.Products || mongoose.model('Products', producSchema);

export default Products;
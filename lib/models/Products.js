import mongoose from "mongoose";


const producSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true,   
    },   
    
    price: {
        type: Number,
        required: true,
    },
    image: {   
        type: String,
        default: '', 
    },
    desc: {   
        type: String,
        default: '', 
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
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
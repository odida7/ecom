
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
   category: {
         type: String,
         required: true,
   },   
   createdAt: {
         type: Date,
         default: Date.now(),
   }
},
   {timestamp: true}
);

const Categories = mongoose.models.Categories || mongoose.model('Categories', categorySchema);

export default Categories;
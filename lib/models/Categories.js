
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
   name: {
    type: String,
    unique: true,
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
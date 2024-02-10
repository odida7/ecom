import mongoose from 'mongoose';
   

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true, 
    },
    email: { 
        type: String,
        unique: true,
        required: true,   
    },
    password: {
        type: String,
        required: true,
    },
    image: {   
        type: String,
        default: '', 
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

    
},
   {timestamps: true}
)


const User = mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
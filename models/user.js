import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    name: { type: String },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String },
    phoneNumber: { type: Number },
    role: {
        type: String,
        enum: ["admin", "artist", "user"],
        default: "user"
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    restoredAt:{
         type: Date,
        default: null
    }
}, { timestamps: true });

export default  mongoose.model("users", userschema);
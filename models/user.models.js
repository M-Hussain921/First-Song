import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: { type: String },
    role: {
        type: String,
        enum: ["admin", "artist", "user"],
        default: "user"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    restoredAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

userSchema.virtual("songs", {
    ref: "Song",
    localField: "_id",
    foreignField: "artist"
});

export default mongoose.model("User", userSchema);
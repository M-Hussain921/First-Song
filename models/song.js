import mongoose from'mongoose';

const songSchema=new mongoose.Schema({
    title:{type:String,required:true},
    audioUrl:{type:String,required:true},
    artist:{type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
},{timestamps:true});

export default mongoose.model('Song',songSchema);
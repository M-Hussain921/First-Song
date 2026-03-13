import user from "../models/user.models.js";
import song from "../models/song.models.js";

export const viewSongByTitle=async (req,res)=>{
    const keyword= req.query.title;
    try{
const songs=await song.find({title:{$regex:keyword,$options:"i"}});
if(songs.length===0) res.status(404).json({message:"Song not found"});
res.status(200).json(songs);
    } catch(err){
        res.status(500).json({message:err.message});
    }
};

export const searchArtist=async (req,res)=>{
    const keyword=req.query.name;
    try{
        const artists=await user.find({
            name:{$regex:keyword,$options:"i"},
            role:"artist",
            isDeleted:false
        })
        .select("-password")
        .populate("songs");
    if(artists.length===0) res.status(404).json({ message: "Artist not found" });
res.status(200).json(artists);

    } catch(err){
        res.status(500).json({message:err.message});
    }
};
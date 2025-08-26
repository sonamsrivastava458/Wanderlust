const mongoose = require("mongoose");

const {Schema }= mongoose;
const Review = require("./review.js");

const listingSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    description:String,

    image:{
       url:String,
       filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
            ref:"Review",
    },
],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
}
});

//if delete listing then delete reviews on database...
listingSchema.post("findOneAndDelete", async(listing)=>{
if(listing){
    await Review.deleteMany({_id: {$in: listing.review }})
}
})

const Listing = mongoose.model("Listing" ,listingSchema);
module.exports = Listing;




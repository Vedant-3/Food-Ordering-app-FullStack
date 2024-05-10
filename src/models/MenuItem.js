import mongoose, {model, models, Schema} from "mongoose";

const ExtraPrice = new Schema({
    name: String,
    price: Number,
})

const MenuItemSchema = new Schema({
    name :{type:String},
    desc :{type:String},
    image:{type:String},
    price :{type:Number},
    category:{type: mongoose.Types.ObjectId},
    sizes:{type:[ExtraPrice]},
    extra:{type:[ExtraPrice]}
},{timestamps:true});

export const MenuItem = models?.MenuItem || model("MenuItem",MenuItemSchema);
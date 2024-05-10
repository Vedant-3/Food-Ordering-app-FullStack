import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {type: String, required: true,unique:true},
    address: {type: String},
    pincode: {type: String},
    city: {type: String},
    phone: {type: String},
    admin: {type: Boolean, default: false},
    password:{type:String,required:true},
    name:{type:String}
  }, {timestamps: true});
export const User  = models?.User  || model('User', UserSchema);

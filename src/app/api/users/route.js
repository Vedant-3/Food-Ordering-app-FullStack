import { User } from "@/models/User";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
        const users = await User.find();
        return Response.json(users);
}

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL);
    const {_id,...data} = await req.json();
    if(isAdmin()){
        await User.findByIdAndUpdate(_id,data);
    }
    return Response.json(true);
}
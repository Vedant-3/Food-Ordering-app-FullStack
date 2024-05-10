import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    let filter = {};
    const { _id } = data;
    if (_id) {
        filter = {_id};
        console.log('helllo ') ;
        console.log(filter)
    }
    else {
        const session = await getServerSession(authOptions);
        const email = session.user.email;
        filter = { email };
        console.log('byee '+filter) ;
        
    }
    const user = await User.findOne(filter);
    await User.findOneAndUpdate({email:user.email}, data);

    return Response.json(true);
}

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if(_id){
        const user = await User.findOne({_id}).lean();
        return Response.json({...user})
    }
    else{
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        if (!email) {
            return Response.json({});
        }
        const user = await User.findOne({ email }).lean();
        return Response.json({...user})
    }

    
    
}
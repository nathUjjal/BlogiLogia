import {Schema,model} from "mongoose";

const blogsSchema = Schema({
    coverImg:{
        type:String,
    },
    title :{
        type : String,
        required : true,
    },
    body :{
        type: String,
        required : true,
    },
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    userId:{
        type: String,
    },
},{ timestamps : true});

export const blog = model('Blogs',blogsSchema);

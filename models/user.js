import mongoose  from "mongoose";
import { createHmac ,randomBytes} from 'crypto';
import { authentication } from "../services/authentication.js"

const userSchema = mongoose.Schema({
    username :{
        type : String,
        required :true,
    },
    profile_img :{
        type:String,
    },
    email :{
        type : String,
        required :true,
    },
    phone_no:{
        type : String,
    },
    password :{
        type : String,
        required :true,
    },
    salt :{
        type : String,
    },
    role :{
        type : String,
        enum : ['ADMIN','USER'],
        default : 'USER',
    },
},{timestamps : true});

userSchema.pre('save',function(next){
    const user = this;
    const salt = randomBytes(16).toString();
    const hashPassword = createHmac('sha256', salt)
                .update(user.password)
                .digest('hex');
    this.salt=salt;
    this.password=hashPassword;
    next();
});

userSchema.static('matchPassword',async function(email,password,role){
    const user =await this.findOne({ email });
    //console.log("user from mongo ",user);
    if (!user) throw new Error("email not Found");
    //console.log("in model",user);
    const currentPassword = createHmac('sha256',user.salt)
                .update(password)
                .digest('hex');
    if ( user.password !==  currentPassword) throw new Error("Incorrect Password") ;
    if ( role == "ADMIN" && user.role !==  role) throw new Error("Incorrect Password") ;
    const token = authentication.createJWTToken(user);
    return  token;
});

export const users = mongoose.model('users',userSchema);
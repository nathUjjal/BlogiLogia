import {users} from "../models/user.js";
import {authentication} from "../services/authentication.js"

async function handlUserSignup(req,res) {
    const { username, email, password ,phone_no} = req.body;
    const newUser=await users.create({
        username, 
        email,
        password,
        phone_no,
    });
    const token = authentication.createJWTToken(newUser);
    res.cookie('AuthToken',token).redirect("/");
}
async function handlUserSignin(req,res) {   
    const { email, password , role } = req.body;
    try{
        const token = await users.matchPassword(email,password,role);
        res.cookie('AuthToken',token).redirect("/");
    }   
    catch(err){
        res.render('signin',{ error : "Incorrect email or password"});
    }
}
async function setProfileDetails(req,res) {
    const updatedUser = await users.findOneAndUpdate (
        { _id : req.body._id},
        { profile_img : req.file.filename ,
            phone_no : req.body.phoneNo,
        });
    const newtoken = authentication.createJWTToken({
        ...updatedUser,
        profile_img : req.file.filename ,
        phone_no : req.body.phoneNo
    });
    res.cookie('AuthToken',newtoken).redirect("/");
}

export const controllers = {
    handlUserSignup,
    handlUserSignin,
    setProfileDetails,
}
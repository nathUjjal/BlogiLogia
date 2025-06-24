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
    const { email, password } = req.body;
    try{
        const token = await users.matchPassword(email,password);
        res.cookie('AuthToken',token).redirect("/");
    }   
    catch(err){
        res.render('signin',{ error : "Incorrect email or password"});
    }
}
async function setProfileDetails(req,res) {
    // const{ phoneNo,profileImg,email} = req.body;
    const updatedUser = await users.findOneAndUpdate (
        { _id : req.body._id},
        { profile_img : req.file.filename ,
            phone_no : req.body.phoneNo,
        });
    console.log(updatedUser);
    const token = authentication.createJWTToken(updatedUser);
    res.cookie('AuthToken',token).redirect("/");
}

export const controllers = {
    handlUserSignup,
    handlUserSignin,
    setProfileDetails,
}
import express from "express";
import {controllers} from "../controllers/userControllers.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null,filename);
  },
});

const upload = multer({ storage: storage });

export const router = express.Router();

router.get('/signin',(req,res)=> res.render('signin'));
router.get('/signup',(req,res)=> res.render('signup'));
router.get('/profile',(req,res)=> res.render('profile',{
    user:req.user,
}));

router.post('/signin',controllers.handlUserSignin);
router.post('/signup',controllers.handlUserSignup);
router.post('/set-profile',upload.single("profileImg"),controllers.setProfileDetails);

router.get('/logout',(req,res)=>{
    res.clearCookie("AuthToken");
    res.redirect("/");
});





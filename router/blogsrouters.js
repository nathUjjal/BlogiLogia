import express from "express";
import {blogController} from "../controllers/blogControllers.js"
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/blogs'))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null,filename);
  },
});

const upload = multer({ storage: storage });

export const blogsRouter = express.Router();

blogsRouter.get('/add',(req,res)=> {
    //console.log(req.user);
    res.render('addBlogForm',{
    user:req.user,
})
});
blogsRouter.get('/:id',blogController.blogDetails);

blogsRouter.post('/add',upload.single("coverImg"),blogController.addBlog);
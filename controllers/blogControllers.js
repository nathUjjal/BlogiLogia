import {blog} from "../models/Blogs.js"

async function addBlog(req,res) {
    await blog.create({
        coverImg:req.file.filename,
        title:req.body.title,
        body :req.body.blogContent,
        name:req.body.name,
        email:req.body.email,
        userId:req.body._id,
    })
    res.redirect('/');
}
export const blogController = {
    addBlog,
};
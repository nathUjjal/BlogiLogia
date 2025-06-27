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
async function blogDetails(req,res) {
    //const blogId = req.params.id;
    //console.log("in controlers",req.user);
    const fullBlog = await blog.findById(req.params.id);
    //console.log(fullBlog);
    res.render("blogDetails",{
        blog:fullBlog,
        user:req.user,
    })
}
async function deleteBlogDetails(req,res) {
    await blog.deleteOne({ _id : req.params.id})
    .then(()=>console.log("successfully Deleted"))
    .catch((error)=>console.log(error));
    res.redirect("/");
}

export const blogController = {
    addBlog,
    blogDetails,
    deleteBlogDetails,
};
import path from "path" ;
import express from "express";
import {router} from "./router/staticRoutes.js";
import {blogsRouter} from "./router/blogsrouters.js"
import {connectToMongo} from "./connection.js"
import { middleware} from "./middleware/authenticate.js";
import cookieParser from "cookie-parser";
import { blog } from "./models/Blogs.js";
const PORT =  process.env.PORT || 8000 ;
const app = express();

app.set('view engine','ejs');
app.set('views', path.resolve('views'));

connectToMongo("mongodb://localhost:27017/BloggiLogia");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/',middleware.checkCookieToAuthenticate("AuthToken"));

app.get('/',async (req,res) => res.render('Home',{
    user:req.user,
    Blogs:await blog.find().sort({ createdAt: -1 }),
}));
app.use('/user',router);
app.use('/blog',blogsRouter);

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})
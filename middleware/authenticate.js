import {authentication} from "../services/authentication.js"
function checkCookieToAuthenticate(cookie){
    return(req,res,next) => {
        const userCookie = req.cookies[cookie];
        if(!userCookie) return next() ;
        try{
            const userPayload = authentication.verifyToken(userCookie);
            req.user=userPayload;
        }catch(err){}     
        next();
    }    
}
export const middleware ={
    checkCookieToAuthenticate,
}
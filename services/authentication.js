import jwt from "jsonwebtoken";

const secret = "sdk$g3487!93tgo%";

function createJWTToken(user){
    const payload = {
        _id: user._id,
        name: user.username,
        email:user.email,
        role:user.role,
        profileImg:user.profile_img,
        phone_no:user.phone_no,
    }
    //console.log(payload);
    const token = jwt.sign(payload,secret);
    return token;
}

function verifyToken(token){
    const payload = jwt.verify(token,secret);
    return payload;
}

export const authentication = {
    createJWTToken,
    verifyToken,
}
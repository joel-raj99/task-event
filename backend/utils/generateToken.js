// Token generation
import jwt from  'jsonwebtoken';


const generateTokenAndSetCookie = (userId,res) => {        // userId is id of new user created  in database. res is response object to set cookie on client side
    const token = jwt.sign({userId},process.env.JWT_KEY,{    // create  a new token with userId as payload and JWT secret key
        expiresIn : process.env.JWT_EXPIRY
    })

    res.cookie("jwt",token,{                                     // res .cookie() is used to set a cookie on the response object. The first argument is the name     return token;
        maxAge : 15 * 24 * 60 * 60 * 1000,                         // Millisecond
        httpOnly : true,                                           // Prevent XSS attacks
        sameSite : "strict" ,                                      // Prevent CSRF attacks
        secure : process.env.NODE_ENV !== "development"
    })

    // Also store the role in local storage
    // localStorage.setItem('role', role);

    return token
}

export default generateTokenAndSetCookie;
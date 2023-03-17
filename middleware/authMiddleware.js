const jwt = require('jsonwebtoken'); 
const User = require('../models/User')


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    //check jsonwebtoken exists and verified

    if (token) {
        jwt.verify(token, 'secret key brother', (err, decoded) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login'); 
            } else {
                console.log(decoded); 
                next();  
            }
            
        })
    }   
    else {
        res.redirect('/login'); 
    }

}


//check current user 
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt; 

    if(token) {
        jwt.verify(token, 'secret key brother', async (err, decoded) => {
            if(err) {
                console.log(error); 
                res.locals.user = null; 
                next(); 
            }else {
                console.log(decoded); 
                let user = await User.findById(decoded.id); 
                res.locals.user = user; 

            }
        })
    } else {
        res.locals.user = null; 
        next(); 
    }
}

module.exports = { requireAuth, checkUser }; 
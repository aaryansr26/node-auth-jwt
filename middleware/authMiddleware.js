const jwt = require('jsonwebtoken'); 


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

module.exports = { requireAuth }; 
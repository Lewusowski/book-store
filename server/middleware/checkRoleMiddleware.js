const jwt = require('jsonwebtoken');

module.exports = function(role){
    return function(req, res, next){
        if(req.method === 'OPTIONS'){next()}
        try{
            let token = req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(401).json({message:"Unauthorized"});
            }
            // token = token.slice(-1, 1)
            console.log("token " + token);
            const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
            console.log("role: " + decodedUser.role);
            if(decodedUser.role!==role){
                return res.status(403).json({message:"Forbidden"});
            }
            req.user = decodedUser;
            next();
        }catch(err){
            res.status(500).json({message:err});
        }
    }
}
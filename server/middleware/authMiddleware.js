const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    if (req.method === 'OPTIONS'){next({})}
    try{
        let token = req.headers.authorization.split(' ')[1];
        console.log("token " + token);
        if(!token){
            return res.status(401).send('Unauthorized');
        }
        const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log('decoded:' + decodedUser.id);
        req.user = decodedUser;
        next();
    } catch(e){
        console.log(e)
        return res.status(401).send(e);
    }
}
'use strict'
const service = require('../services')
function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'No authorization'})
    }
    const token = req.headers.authorization.split(" ")[1];
    
    service.decodeToken(token)
        .then(response =>{
            req.user = response
            console.log(req.user);
            next();
        })
        .catch(response =>{
            console.log("entro al catch")
            res.status(response.status).send(response.message);
        })
}

module.exports = isAuth;
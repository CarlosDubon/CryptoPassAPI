'use strict'
const service = require('../services/index')
function isAuth(req,res,next){
    if(!req.headers.autorization){
        return res.status(403).send({message:'No authorization'})
    }
    const token = req.headers.autorization.split(" ")[1];
    
    service.decodeToken(token)
        .then(response =>{
            req.user = response
            next();
        })
        .catch(response =>{
            res.status(response.status);
        })
}

module.exports = isAuth;
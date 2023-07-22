const { cleanCache } = require('../services/cache');

module.exports = async function(req,res,next){
    await next();
    cleanCache(req.user.id);
}
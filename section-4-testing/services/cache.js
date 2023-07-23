const mongoose = require('mongoose');
const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)
const util = require('util');
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}){
    this.useCache = true
    this.hashKey = JSON.stringify(options.key || "");
    return this;
}

mongoose.Query.prototype.exec = async function(){

    if(this.useCache === false){
        return exec.apply(this,arguments);
    }

    const keyObject = Object.assign({},
        this.getQuery(),
        { collection : this.mongooseCollection.name}
    );

    const key = JSON.stringify(keyObject);

    // See if we have value for 'key in redis
    const cachedValue = await client.hget(this.hashKey,key);

    // If we do , return that value
    if(cachedValue){
        // const mongooseDocument = new this.model(JSON.parse(cachedValue));
        // this.model([{},{}])

        const doc = JSON.parse(cachedValue);

        const mongooseDoc = Array.isArray(doc) 
        ? doc.map(_doc => this.model(_doc))
        : new this.model(doc);

        return mongooseDoc;
    }

    // Otherwise , issue the query and store the result in redis.
    const result = await exec.apply(this,arguments);

    client.hset(this.hashKey,key,JSON.stringify(result),'EX',2*60); // 2 mins
    
    return result;
}


module.exports = {
    cleanCache(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
}
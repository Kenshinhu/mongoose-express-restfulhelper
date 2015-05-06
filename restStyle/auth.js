/**
 * Created by jianxinhu on 15/5/5.
 */

var validator = require('validator');

var baseProxy = require('../lib/baseProxy');

var bcrypt = require('bcrypt');

//var auth

function sampleAuth(router,model,opt){

    var authorizeKey = opt.authorizeKey;

    var accessKey = opt.accessKey;

    router.post('/login',function(req,res,next){

        var authorizeKeyValue = validator.trim(req.body[authorizeKey]);

        var accessKeyValue = validator.trim(req.body[accessKey]);

        var authProxy = new baseProxy(model.modelName);

        var params = {};
        params[authorizeKey] = authorizeKeyValue;
        console.log(params);

        authProxy.findOne(params,function(err,result){

            console.log("result : %s",result);

            if(err)
                return next(err);

            if(result === null)
                return next(new Error("not register"));


            bcrypt.compare(accessKeyValue,result[accessKey],function(err,bool){
            //
                if(!bool)
                    return next(new Error("password is not match"));
            //
                res.json({
                    auth:result
                });
            });

        });

    });

    router.post('/register',function(req,res,next){

        var authorizeKeyValue = validator.trim(req.body[authorizeKey]);

        var accessKeyValue = validator.trim(req.body[accessKey]);

        if([authorizeKeyValue,accessKeyValue].some(function(item){return item==='';})){

            return next(new Error("field is empty"));
        }

        var authProxy = new baseProxy(model.modelName);

        var params = {};

        params[authorizeKey] = authorizeKeyValue;

        authProxy.findOne(params,function(err,result){

            console.log("result : %s",result);

            if(err)
                return next(err);

            if(result !== null)
                return next(new Error("registered"));


            bcrypt.hash(accessKeyValue,10,function(err,passhash){

                var obj = {};

                obj[authorizeKey] = authorizeKeyValue;
                obj[accessKey]    = passhash;

                authProxy.save(obj,function(err,result){

                    res.json({
                        auth:result
                    });
                });

            });

        });

    });

    router.post('/logout',function(req,res,next){

        res.json({
            "auth":0
        })

    });

    router.post('/forget',function(req,res,next){
        res.json({
            "auth":0
        })
    });

    return router;

}

module.exports = sampleAuth;
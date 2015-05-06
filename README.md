mongoose-express-restful
----

    var express = require('express');
    var bodyParser = require('body-parser');

    var app = express();


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    //======model
    var Person = require('../model').Person;
    var msUser = require('../model').msUser;


    var restfulHelper = require('../index');

    var router =express.Router();

    console.log(restfulHelper);

    app.use(restfulHelper.crud(router,msUser));
    app.use(restfulHelper.auth(router,msUser,{
        "authorizeKey":"msUserName",
        "accessKey":"msPassword"
    }));


    app.get('/test',function(req,res){

        res.send("Hello");

    });
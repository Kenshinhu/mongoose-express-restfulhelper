/**
 * Created by jianxinhu on 15/5/4.
 */

var BaseProxy = require('./baseProxy');
var util = require("util");
var queryHelper = require('mongoose-queryhelper');

var validator = require('validator');

var m = require('mongoose');

function RequestProxy(modelName){
    BaseProxy.call(this,modelName);
};

util.inherits(RequestProxy, BaseProxy);


/**
 * read proxy
 * @param opt
 *  opt.query = {zh_pageTitle : queryString}
 * @returns {Function}
 */
RequestProxy.prototype.readProxy = function(option){

    var opt = option || {};

    var _ = this;

    return function(req,res,next){

        var pageIndex = validator.toInt(req.query.pageIndex) || 1;
        var pageCount = validator.toInt(req.query.pageCount) || 10;
        //var queryString = validator.trim(req.query.qs);

        var helper = new queryHelper(_.modelName,m).query();

        //var condiction = opt.query || {};
        var sort = opt.sort || "";

        //for(var index = 0;index < condiction.length;index++){
        //
        //    var obj = condiction[index];
        //
        //    helper = helper.query(obj);
        //}

        if(sort !== ""){
            helper = helper.sort(sort);
        }


        helper.limit(pageIndex,pageCount).pagination(function(err,data,total,totalPage,pageCount,currentPage){

            res.json({
                data:data,
                total:total,
                totalPage:totalPage,
                pageCount:pageCount,
                pageIndex:currentPage
            });

        });
    }
}


/**
 * create proxy
 * @returns {Function}
 */
RequestProxy.prototype.updateProxy = function(){

    var _ = this;

    return function(req,res,next){

        //通过数据检测

        var body = req.body;

        console.log("body "+body);

        var _response = res;

        _.save(body,function(err,result){

            err === null ? function(res,result){
                res.json(result);
            }(_response,result) : next(err);

        });
    }

}

RequestProxy.prototype.getProxy = function(){

    var _ = this;

    return function(req,res,next){
        var _id = req.params["_id"];

        var _response = res;

        _.findById(_id,function(err,result){

            err === null ? function(res,result){
                res.json(result);

            }(_response,result) : next(err);

        })
    };
};


RequestProxy.prototype.deleteProxy = function(){

    var _ = this;

    return function(req,res,next){

        //todo 检测是否有ID的实例是否存在

        var _id = req.params["_id"];

        var _response = res;

        _.removeById(_id,function(err,result){

            err === null ? function(res,result){
                res.json(result);

            }(_response,result) : next(err);

        })

    }
}




module.exports = RequestProxy;
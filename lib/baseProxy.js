/**
 * Created by jianxinhu on 15/5/2.
 */
//

var m = require('mongoose');

var validator = require('validator');
var log = console.log;

function BaseProxy(modelName){

    this.modelName = modelName;

    log("baseProxy:%s",modelName);

    this.model = m.model(modelName);
}


/**
 * 保存方法
 * @param obj
 * @param fn
 */
BaseProxy.prototype.save = function(obj,fn){

    console.log("obj : "+JSON.stringify(obj,'','\t'));

    var _model = this.model;

    console.log("model:"+_model);

    if(typeof obj._id !== "undefined"){
        _model.findByIdAndUpdate(obj._id,obj,function(err,result){
            fn(err,result);
        });
    }else{
        _model.create(obj,fn);
    }

}

/**
 *
 */
BaseProxy.prototype.findOne = function(opt,fn){

    //var _model = this.model;

    this.model.findOne(opt).exec(fn);

}





/**
 * 查找单个记录
 * @param _id
 * @param fn
 */
BaseProxy.prototype.findById = function(_id,fn){
    this.model.findOne({"_id":_id},fn);
}





/**
 * 删除单个记录
 * @param _id
 * @param fn
 */
BaseProxy.prototype.removeById = function(_id,fn){
    this.model.remove({"_id":_id},fn);
}

module.exports = BaseProxy;
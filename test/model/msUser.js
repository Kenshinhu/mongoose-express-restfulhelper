/**
 * Created by jianxinhu on 15/5/5.
 */
'use strict';

var m = require('mongoose');

var Schema = m.Schema;

var ObjectId = m.Schema.Types.ObjectId;

var personSchema = new Schema({
    msUserName: String,
    msPassword: String,
    status: String,
    createAt: {type:Number,default:Date.now}
});

m.model('msUser', personSchema);
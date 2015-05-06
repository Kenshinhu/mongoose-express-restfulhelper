/**
 * Created by jianxinhu on 15/5/5.
 */
/**
 * Created by jianxinhu on 15/5/5.
 */
'use strict';

var m = require('mongoose');

var Schema = m.Schema;

var ObjectId = m.Schema.Types.ObjectId;

var personSchema = new Schema({
                                name: String,
                                birthName: String
                             });

m.model('Person', personSchema);
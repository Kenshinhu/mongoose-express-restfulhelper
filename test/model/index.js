/**
 * Created by jianxinhu on 15/5/5.
 */

'use strict';

var m = require('mongoose');
m.connect('mongodb://localhost:27017/qh_test_data');

require("./person");

require("./post");

require("./msUser");

exports.Person =m.model('Person');

exports.Post = m.model('Post');

exports.msUser = m.model('msUser');



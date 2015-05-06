/**
 * Created by jianxinhu on 15/5/4.
 */
var app = require('./app');
var should = require('should');
var request = require('supertest');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qh_test_data');

describe(require('path').basename(__filename), function () {

    it('#test',function(done){

        request(app).get('/test')
            .expect(200)
            .end(function(err,res){
                done();
            });

    });

});

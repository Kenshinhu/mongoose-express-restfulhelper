/**
 * Created by jianxinhu on 15/5/5.
 */
var m = require('mongoose');
var Schema = m.Schema;
var ObjectId = m.Schema.Types.ObjectId;

var postSchema = new Schema({
    title: String,
    content:{type:String},
    poster: { type: ObjectId, ref: 'Person'  },
    createAt:{ type:String, default:Date.now}
});

m.model('Post',postSchema);
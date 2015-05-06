/**
 * Created by jianxinhu on 15/5/5.
 */

var requestProxy = require('../lib/requestProxy');

function crud(router,model,opt){

    var pathName = model.modelName.toLowerCase();

    var proxy = new requestProxy(model.modelName);
    router.get("/"+pathName,proxy.readProxy());
    router.post("/"+pathName,proxy.updateProxy());
    router.delete("/"+pathName,proxy.deleteProxy());

    return router;

}

module.exports = crud;
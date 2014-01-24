module.exports = function() {
    var fn = function(req, res){
        console.log("An example of routing");
    };

    this.get('/route', fn);
   
    this.routeGroup('/api/v1/', function(group) {
        group.get('users', fn);
    });    
};
var router = require('../config/routes.js');

describe('routing urls to controller actions', function(){
  it("should configure all the routes", function(fn){
    router.configure(app, passport);
    // assert that all the routes call the controllers
    fn();
  });
});

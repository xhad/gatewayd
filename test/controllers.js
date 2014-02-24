var sinon = require("sinon");
var Adapter = require("ripple-gateway-data-sequelize-adapter");
var controllers = require("../app/controllers/index.js");

describe('mapping controllers to api calls', function(){
  before(function(){
    adapter = new Adapter();
    req = { body: {} };
    res = {};
  });

  describe('external accounts', function(){
    it('should create a external account', function(fn){
      adapter.createExternalAccount = sinon.spy();
      controllers.external_accounts.create(req, res);
      assert(adapter.createExternalAccount).calledWith(req.body);
      fn();
    });
    it('should read an external account', function(fn){
      adapter.getExternalAccount = sinon.spy();
      controllers.external_accounts.show(req, res);
      assert(adapter.getExternalAccount).calledWith(req.body);
      fn();
    });
    it('should update an external account', function(fn){
      adapter.updateExternalAccount = sinon.spy();
      controllers.external_accounts.update(req, res);
      assert(adapter.updateExternalAccount).calledWith(req.body);
      fn();
    });
    it('should delete an external account', function(fn){
      adapter.deleteExternalAccount = sinon.spy();
      controllers.external_accounts.delete(req, res);
      assert(adapter.deleteExternalAccount).calledWith(req.body);
      fn();
    });
  });

  describe('external transactions', function(){
    it('should create a external transaction', function(fn){
      adapter.createExternalTransaction = sinon.spy();
      controllers.external_transactions.create(req, res);
      assert(adapter.createExternalTransaction).calledWith(req.body);
      fn();
    });
    it('should read an external transaction', function(fn){
      adapter.getExternalTransaction = sinon.spy();
      controllers.external_transactions.show(req, res);
      assert(adapter.getExternalTransaction).calledWith(req.body);
      fn();
    });
    it('should update an external transaction', function(fn){
      adapter.updateExternalTransaction = sinon.spy();
      controllers.e.update_transactions.update(req, res);
      assert(adapter.updateExternalTransaction).calledWith(req.body);
      fn();
    });
    it('should delete an external transaction', function(fn){
      adapter.deleteExternalTransaction = sinon.spy();
      controllers.external_transactions.delete(req, res);
      assert(adapter.deleteExternalTransaction).calledWith(req.body);
      fn();
    });
  });

  describe('ripple addresses', function(){
    it('should create a ripple address', function(fn){
      adapter.createRippleAddress = sinon.spy();
      controllers.ripple_addresses.create(req, res);
      assert(adapter.createRippleAddress).calledWith(req.body);
      fn();
    });
    it('should read a ripple address', function(fn){
      adapter.getRippleAddress = sinon.spy();
      controllers.ripple_addresses.show(req, res);
      assert(adapter.getRippleAddress).calledWith(req.body);
      fn();
    });
    it('should update a ripple address', function(fn){
      adapter.updateRippleAddress = sinon.spy();
      controllers.ripple_addresses.update(req, res);
      assert(adapter.updateRippleAddress).calledWith(req.body);
      fn();
    });
    it('should delete a ripple address', function(fn){
      adapter.deleteRippleAddress = sinon.spy();
      controllers.ripple_addresses.delete(req, res);
      assert(adapter.deleteRippleAddress).calledWith(req.body);
      fn();
    });
  });

  describe('ripple transaction', function(){
    it('should create a ripple transaction', function(fn){
      adapter.createRippleTransaction = sinon.spy();
      controllers.ripple_transactions.create(req, res);
      assert(adapter.createRippleTransaction).calledWith(req.body);
      fn();
    });
    it('should read an ripple transaction', function(fn){
      adapter.getRippleTransaction = sinon.spy();
      controllers.ripple_transactions.show(req, res);
      assert(adapter.getRippleTransaction).calledWith(req.body);
      fn();
    });
    it('should update an ripple transaction', function(fn){
      adapter.updateRippleTransaction = sinon.spy();
      controllers.ripple_transactions.update(req, res);
      assert(adapter.updateRippleTransaction).calledWith(req.body);
      fn();
    });
    it('should delete an ripple transaction', function(fn){
      adapter.deleteRippleTransaction = sinon.spy();
      controllers.ripple_transactions.delete(req, res);
      assert(adapter.deleteRippleTransaction).calledWith(req.body);
      fn();
    });
  });
  describe('users', function(){
    it('should create a user', function(fn){
      adapter.createUser = sinon.spy();
      controllers.users.create(req, res);
      assert(adapter.createUser).calledWith(req.body);
      fn();
    });
    it('should read an user', function(fn){
      adapter.getUser = sinon.spy();
      controllers.users.show(req, res);
      assert(adapter.getUser).calledWith(req.body);
      fn();
    });
    it('should update an user', function(fn){
      adapter.updateUser = sinon.spy();
      controllers.users.update(req, res);
      assert(adapter.updateUser).calledWith(req.body);
      fn();
    });
    it('should delete an user', function(fn){
      adapter.deleteUser = sinon.spy();
      controllers.users.delete(req, res);
      assert(adapter.deleteUser).calledWith(req.body);
      fn();
    });
  });
  describe('balances', function(){
    it('should read an balance', function(fn){
      adapter.getBalance = sinon.spy();
      controllers.balances.show(req, res);
      assert(adapter.getBalance).calledWith(req.body);
      fn();
    });
    it('should get many balances', function(fn){
      adapter.getBalances = sinon.spy();
      controllers.balances.index(req, res);
      assert(adapter.getBalances).calledWith(req.body);
      fn();
    });
  });
})

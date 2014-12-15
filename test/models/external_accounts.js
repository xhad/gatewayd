process.env.NODE_ENV = 'test_in_memory';
const gatewayd = require(__dirname+'/../../');

var ExternalAccounts = gatewayd.models.externalAccounts;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var fixtures = require(__dirname+'/../fixtures/models');

var validExternalAccount = fixtures.externalAccounts.valid;

describe('external_accounts model', function(){

  chai.use(chaiAsPromised);

  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it('should successfully create an entry', function(){
    this.timeout(5000);
    return ExternalAccounts.create(validExternalAccount)
      .then(function(externalAccount){
        chai.assert(externalAccount.id);
        chai.assert.strictEqual(externalAccount.dataValues.address, validExternalAccount.address);
        chai.assert.strictEqual(externalAccount.dataValues.type, validExternalAccount.type);
      }).error(function(error) {
        throw new Error(JSON.stringify(error));
      });
  });
  
  it('should fail to persist due to duplicate address field', function(){
    return ExternalAccounts.create(validExternalAccount)
      .then(function(externalAccount){
        return chai.assert.isRejected(ExternalAccounts.create(validExternalAccount));
      }).error(function(error) {
        throw new Error(JSON.stringify(error));
      });
  });
});

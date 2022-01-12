import chai from 'chai';
const expect = chai.expect;
import users from './sample-test-data/user-test-data';

describe('User', () => {

  let user;
  it.skip('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it.skip('should be an instance of user', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it.skip('should have an id', () => {
    expect(user[0].id).to.equal(1);
  });

  it.skip('should have a name', () => {
    expect(user[0].name).to.equal('Leatha Ullrich');
  });
});



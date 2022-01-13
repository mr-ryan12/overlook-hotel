import chai from 'chai';
const expect = chai.expect;
import users from './sample-test-data/user-test-data';
import bookings from './sample-test-data/bookings-test-data';
import rooms from './sample-test-data/rooms-test-data';
import User from '../src/classes/User'



describe('User', () => {

  let user;
  let booking1 = bookings[0];
  let booking2 = bookings[1];

  beforeEach(() => {
    user = new User(users[0], bookings, rooms);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of user', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have users', () => {
    expect(user).to.be.an('object');
  });

  it('should have an id', () => {
    expect(user.id).to.equal(9);
  });

  it('should have a name', () => {
    expect(user.name).to.equal('Faustino Quitzon');
  });

  it('should be able to not have any bookings', () => {
    expect(user.bookings.length).to.equal(0);
    expect(user.bookings).to.deep.equal([]);
  });

  it('should be able to add bookings', () => {
    user.addBooking(booking1);

    expect(user.addBooking).to.be.a('function');
    expect(user.bookings.length).to.equal(1);
    expect(user.bookings[0].id).to.equal('5fwrgu4i7k55hl6sz');
    expect(user.bookings[0].userID).to.equal(9);
    expect(user.bookings[0].date).to.equal('2022/04/22');
    expect(user.bookings[0].roomNumber).to.equal(15);
    expect(user.bookings[0].roomServiceCharges).to.deep.equal([]);
  });

  it('should initially start off without spending anything', () => {
    expect(user.totalSpent).to.equal(0);
  });

  it('should calculate how much they have spent so far', () => {
    user.addBooking(booking1);
    user.calculateTotalSpent(rooms);

    expect(user.calculateTotalSpent).to.be.a('function');
    expect(user.totalSpent).to.equal(294.56);
  });

  it('should update how much they have spent', () => {
    user.addBooking(booking1);
    user.addBooking(booking2);

    user.calculateTotalSpent(rooms);

    expect(user.totalSpent).to.equal(621.80);
  });
});

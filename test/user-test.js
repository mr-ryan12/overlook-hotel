import chai from 'chai';
const expect = chai.expect;
import users from './sample-test-data/user-test-data';
import bookings from './sample-test-data/bookings-test-data';
import rooms from './sample-test-data/rooms-test-data';
import User from '../src/classes/User'



describe('User', () => {

  let user;
  let booking1 = bookings[3];
  let booking2 = bookings[4];
  let booking3 = bookings[0];

  beforeEach(() => {
    user = new User(users[0], bookings, rooms);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of user', () => {
    expect(user).to.be.an.instanceof(User);
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
    expect(user.bookings[0].id).to.equal('5fwrgu4i7k55hl792');
    expect(user.bookings[0].userID).to.equal(9);
    expect(user.bookings[0].date).to.equal('2022/01/10');
    expect(user.bookings[0].roomNumber).to.equal(19);
    expect(user.bookings[0].roomServiceCharges).to.deep.equal([]);
  });

  it('should have a default amount spent', () => {
    expect(user.totalSpent).to.equal(0);
  });

  it('should calculate how much they have spent so far', () => {
    user.addBooking(booking1);
    user.calculateTotalSpent(rooms);

    expect(user.calculateTotalSpent).to.be.a('function');
    expect(user.totalSpent).to.equal(374.67);
  });

  it('should update how much they have spent', () => {
    user.addBooking(booking1);
    user.addBooking(booking2);

    user.calculateTotalSpent(rooms);

    expect(user.totalSpent).to.equal(551.03);
  });

  it('should default to no past bookings', () => {
    expect(user.pastBookings.length).to.equal(0);
  });

  it('should have past bookings', () => {
    const todaysDate = '2022/01/18';

    user.addBooking(booking1);
    user.addBooking(booking2);
    user.addBooking(booking3);

    user.findPastBookings(todaysDate);

    expect(user.pastBookings.length).to.equal(2);
    expect(user.pastBookings[0].id).to.equal('5fwrgu4i7k55hl792');
  });
});

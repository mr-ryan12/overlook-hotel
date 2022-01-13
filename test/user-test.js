import chai from 'chai';
const expect = chai.expect;
import users from './sample-test-data/user-test-data';
import bookings from './sample-test-data/user-test-data';


describe('User', () => {

  let user;
  let bookings;
  let rooms;

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

  it.skip('should be able to not have any past bookings', () => {
    expect(user.pastBookings.length).to.equal(0);
    expect(user.pastBookings.length).to.deep.equal([]);
  });

  it.skip('should be able to have past bookings', () => {
    let pastBookings = user.addBooking(booking);

    expect(pastBookings).to.be.a('function');
    expect(user.pastBookings.length).to.equal(1);
    expect(user.pastBookings[0].id).to.equal('5fwrgu4i7k55hl6t6');
    expect(user.pastBookings[0].userID).to.equal(13);
    expect(user.pastBookings[0].date).to.equal('2022/01/10');
    expect(user.pastBookings[0].roomNumber).to.equal(12);
    expect(user.pastBookings[0].roomServiceCharges).to.deep.equal([]);
  });

  it.skip('should be able to add current bookings', () => {
    let bookedRoom = user.addBooking(booking);

    expect(bookedRoom).to.be.a('function');
    expect(user.currentBookings.length).to.equal(1);
    expect(user.pastBookings[0].id).to.equal('5fwrgu4i7k55hl6sz');
    expect(user.pastBookings[0].userID).to.equal(9);
    expect(user.pastBookings[0].date).to.equal('2022/04/22');
    expect(user.pastBookings[0].roomNumber).to.equal(15);
    expect(user.pastBookings[0].roomServiceCharges).to.deep.equal([]);
  });

  it.skip('should calculate how much they have spent so far', () => {
    let totalSpent = user.calculateTotalSpent();

    expect(totalSpent).to.be.a('function');
    expect(user.totalSpent).to.equal(172.09);
  });
});

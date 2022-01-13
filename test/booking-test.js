import chai from 'chai';
const expect = chai.expect;
import users from './sample-test-data/user-test-data';
import bookings from './sample-test-data/bookings-test-data';
import rooms from './sample-test-data/rooms-test-data';
import Booking from '../src/classes/Booking';

describe('User', () => {

  let booking;
  let booking1 = bookings[3];

  beforeEach(() => {
    booking = new Booking(booking1);
  });

  it.skip('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it.skip('should be an instance of User', () => {
    expect(booking).to.be.an.instanceof(Booking);
  });

  it.skip('should have an id', () => {
    expect(booking.id).to.equal('5fwrgu4i7k55hl792');
  });

  it.skip('should have a user id', () => {
    expect(booking.userID).to.equal(9);
  });

  it.skip('should have a date', () => {
    expect(booking.date).to.equal('2022/01/10');
  });

  it.skip('should have a room number', () => {
    expect(booking.roomNumber).to.equal(19);
  });

  it.skip('should not have any room service charges', () => {
    expect(booking.roomServiceCharges).to.deep.equal([]);
  });
});
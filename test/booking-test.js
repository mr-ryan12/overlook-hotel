import chai from 'chai';
const expect = chai.expect;
import bookings from './sample-test-data/bookings-test-data';
import Booking from '../src/classes/Booking';

describe('Booking', () => {

  let booking;
  let booking1 = bookings[3];

  beforeEach(() => {
    booking = new Booking(booking1);
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceof(Booking);
  });

  it('should have an id', () => {
    expect(booking.id).to.equal('5fwrgu4i7k55hl792');
  });

  it('should have a user id', () => {
    expect(booking.userID).to.equal(9);
  });

  it('should have a date', () => {
    expect(booking.date).to.equal('2022/01/10');
  });

  it('should have a room number', () => {
    expect(booking.roomNumber).to.equal(19);
  });

  it('should not have any room service charges', () => {
    expect(booking.roomServiceCharges).to.deep.equal([]);
  });
});
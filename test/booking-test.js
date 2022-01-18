import chai from 'chai';
const expect = chai.expect;
import bookings from './sample-test-data/bookings-test-data';
import Booking from '../src/classes/Booking';

describe('Booking', () => {

  let booking;
  let booking1 = bookings[3];
  let booking2;

  beforeEach(() => {
    booking = new Booking(booking1);
    booking2 = {
      id: '',
      date: '',
      userID: '',
      roomNumber: '',
      roomServiceCharges: [] 
    }
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceof(Booking);
  });

  it('should have a default id if none is passed in', () => {
    const newBooking = new Booking(booking2);
    expect(newBooking.id).to.equal('0');
  });

  it('should have an id', () => {
    expect(booking.id).to.equal('5fwrgu4i7k55hl792');
  });

  it('should have a default user id', () => {
    const newBooking = new Booking(booking2);
    expect(newBooking.userID).to.equal(0);
  });

  it('should have a user id', () => {
    expect(booking.userID).to.equal(9);
  });

  it('should have a date', () => {
    expect(booking.date).to.equal('2022/01/10');
  });

  it('should have a default room number', () => {
    const newBooking = new Booking(booking2);
    expect(newBooking.roomNumber).to.equal(0);
  });

  it('should have a room number', () => {
    expect(booking.roomNumber).to.equal(19);
  });

  it('should not have any room service charges', () => {
    expect(booking.roomServiceCharges).to.deep.equal([]);
  });

  it('should be able to have room service charges', () => {
    const roomServiceCharge = 100;
    booking.roomServiceCharges.push(roomServiceCharge);
    
    expect(booking.roomServiceCharges).to.be.an('array');
    expect(booking.roomServiceCharges.length).to.equal(1);
    expect(booking.roomServiceCharges[0]).to.equal(100);
  });
});
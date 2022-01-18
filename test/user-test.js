import chai from 'chai';
const expect = chai.expect;
import users from './sample-test-data/user-test-data';
import bookings from './sample-test-data/bookings-test-data';
import rooms from './sample-test-data/rooms-test-data';
import User from '../src/classes/User';



describe('User', () => {

  let user;
  let booking1 = bookings[3];
  let booking2 = bookings[4];
  let booking3 = bookings[0];
  let bookingData = [bookings[0], bookings[1], bookings[2], bookings[4], bookings[5]];

  beforeEach(() => {
    user = new User(users[0], bookings, rooms);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of user', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have a default id if no id given', () => {
    const user1 = new User({id: '', name: 'Guest'});
    expect(user1.id).to.equal(0);
  });

  it('should have an id', () => {
    expect(user.id).to.equal(9);
  });

  it('should have a default name if none given', () => {
    const user1 = new User({id: 0, name: ''});
    expect(user1.name).to.equal('Guest');
  });

  it('should have a name', () => {
    expect(user.name).to.equal('Faustino Quitzon');
  });

  it('should default to no bookings', () => {
    expect(user.bookings.length).to.equal(0);
    expect(user.bookings).to.deep.equal([]);
  });

  it('should have bookings', () => {
    expect(user.bookings.length).to.equal(0);
    user.setBookings(bookingData);
    expect(user.bookings.length).to.equal(3);
  });

  it('should be able to add bookings', () => {
    user.setBookings(bookingData);

    expect(user.bookings.length).to.equal(3);

    user.addBooking(booking1);

    expect(user.addBooking).to.be.a('function');
    expect(user.bookings.length).to.equal(4);
  });

  it('should have the correct booking id', () => {
    user.setBookings(bookingData);
    user.addBooking(booking1);

    expect(user.bookings[0].id).to.equal('5fwrgu4i7k55hl6sz');
    expect(user.bookings[0].roomServiceCharges).to.deep.equal([]);
  });

  it('should have the correct booking date', () => {
    user.setBookings(bookingData);
    user.addBooking(booking1);
    expect(user.bookings[0].date).to.equal('2022/04/22');
  });

  it('should have the correct booking room number', () => {
    user.setBookings(bookingData);
    user.addBooking(booking1);
    expect(user.bookings[0].roomNumber).to.equal(15);
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

    user.findCurrentAndPastBookings(todaysDate);

    expect(user.pastBookings.length).to.equal(2);
    expect(user.pastBookings[0].id).to.equal('5fwrgu4i7k55hl792');
  });

  it('should default to no current bookings', () => {
    expect(user.currentBookings).to.be.an('array');
    expect(user.currentBookings).to.deep.equal([]);
  });

  it('should have current bookings', () => {
    const todaysDate = '2022/01/18';
    const bookingsData = [bookings[0], bookings[5]];

    expect(user.currentBookings.length).to.equal(0);
    
    user.setBookings(bookingData);
    user.findCurrentAndPastBookings(todaysDate);

    expect(user.currentBookings.length).to.equal(2);
    expect(user.currentBookings).to.deep.equal(bookingsData);
  });
});

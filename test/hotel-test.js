import chai from 'chai';
const expect = chai.expect;
import users from './sample-test-data/user-test-data';
import rooms from './sample-test-data/rooms-test-data';
import bookings from './sample-test-data/bookings-test-data';
import Hotel from '../src/classes/Hotel';

describe('Hotel', () => {

  let hotel;
  let usersData = users;
  let roomsData = rooms;
  let bookingsData = bookings;

  beforeEach(() => {
    hotel = new Hotel(usersData, roomsData, bookingsData);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should have a default value if no guests are present', () => {
    const hotel1 = new Hotel();

    expect(hotel1.guests).to.be.an('array');
    expect(hotel1.guests.length).to.equal(0);
  });

  it('should have guests', () => {
    expect(hotel.guests).to.be.an('array');
    expect(hotel.guests.length).to.equal(3);
  });

  it('should have a default value if no rooms are present', () => {
    const hotel1 = new Hotel();

    expect(hotel1.rooms).to.be.an('array');
    expect(hotel1.rooms.length).to.equal(0);
  });

  it('should have rooms', () => {
    expect(hotel.rooms).to.be.an('array');
    expect(hotel.rooms.length).to.equal(9);
  });

  it('should have a default value if no bookings are present', () => {
    const hotel1 = new Hotel();

    expect(hotel1.bookings).to.be.an('array');
    expect(hotel1.bookings.length).to.equal(0);
  });

  it('should have bookings', () => {
    expect(hotel.bookings).to.be.an('array');
    expect(hotel.bookings.length).to.equal(7);
  });

  it('should default to an empty list of available rooms', () => {
    const hotel1 = new Hotel();

    expect(hotel1.availableRooms).to.be.an('array');
    expect(hotel1.availableRooms.length).to.equal(0);
    expect(hotel1.availableRooms).to.deep.equal([]);
  });

  it('should have a list of available rooms', () => {
    const todaysDate = '2022/01/13';

    hotel.setAvailableRooms(todaysDate);
    expect(hotel.availableRooms.length).to.equal(8);
  });

  it('should have a default value if no rooms are available on a specific date', () => {
    const dateSearchValue = '2022/01/11';

    hotel.checkAvailableRoomsByDate(dateSearchValue);

    expect(hotel.availableRooms).to.be.an('array');
    expect(hotel.availableRooms.length).to.equal(0);
  });

  it.skip('should return a message to the user if there are not any rooms available based on their search date', () => {
    const dateSearchValue = '2022/01/11';

    hotel.checkAvailableRoomsByDate(dateSearchValue);

    expect(hotel.availableRooms.length).to.equal(0);
    expect(hotel.checkAvailableRoomsByDate(dateSearchValue)).to.equal('So sorry, there are not any available rooms. Please adjust your search.');
  });

  it.skip('should return a list of rooms on a specific date', () => {
    const dateSearchValue = '2022/01/18';

    hotel.checkAvailableRoomsByDate(dateSearchValue);

    expect(hotel.availableRooms).to.be.an('array');
    expect(hotel.availableRooms.length).to.equal(5);
  });

  it.skip('should not have a room type search by default', () => {
    expect(hotel.filterTerm).to.be.a('string');
    expect(hotel.filterTerm).to.equal('');
  });

  it.skip('should return a message if there are not any rooms available based on their room type search', () => {
    const filterTerm = 'junior suite';

    hotel.checkAvailableRoomsByType(filterTerm);

    expect(hotel.availableRooms.length).to.equal(0);
    expect(hotel.availableRooms).to.deep.equal([]);
    expect(hotel.checkAvailableRoomsByType(filterTerm)).to.equal('So sorry, there are not any available rooms. Please adjust your search.')
  });

  it.skip('should be able to filter the list of available rooms based on the room type', () => {
    const filterTerm = 'residential suite';
    const roomsAvailable = [rooms[6], rooms[7]];

    hotel.filterAvailableRoomsByType(filterTerm);

    expect(hotel.filterTerm).to.equal('residential suite');
    expect(hotel.availableRooms.length).to.equal(2);
    expect(hotel.availableRooms).to.deep.equal(roomsAvailable);
  });
});
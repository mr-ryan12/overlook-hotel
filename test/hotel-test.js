import chai from 'chai';
const expect = chai.expect;
import users from './sample-test-data/user-test-data';
import rooms from './sample-test-data/rooms-test-data';
import bookings from './sample-test-data/bookings-test-data';
import Hotel from '../src/classes/Hotel';

describe('Hotel', () => {

  let hotel;
  let usersData = [users[0], users[1], users[2]];
  let roomsData = [rooms[0], rooms[1], rooms[2], rooms[3], rooms[4], rooms[5]];
  let bookingsData = [bookings[0], bookings[1], bookings[2]];

  beforeEach(() => {
    hotel = new Hotel(usersData, roomsData, bookingsData);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it.skip('should have a default value if no guests are present', () => {
    expect(hotel.guests).to.be.an('array');
    expect(hotel.guests.length).to.equal(0);
  })

  it.skip('should have guests', () => {
    expect(hotel.guests).to.be.an('array');
    expect(hotel.guests.length).to.equal(3);
  });

  it.skip('should have a default value if no rooms are present', () => {
    expect(hotel.rooms).to.be.an('array');
    expect(hotel.rooms.length).to.equal(0)
  })

  it.skip('should have rooms', () => {
    expect(hotel.rooms).to.be.an('array');
    expect(hotel.rooms.length).to.equal(5);
  });

  it.skip('should have a default value if no bookings are present', () => {
    expect(hotel.bookings).to.be.an('array');
    expect(hotel.bookings.length).to.equal(0);
  });

  it.skip('should have bookings', () => {
    expect(hotel.bookings).to.be.an('array');
    expect(hotel.bookings.length).to.equal(3);
  });

  it.skip('should default to an empty list of available rooms', () => {
    expect(hotel.availableRooms).to.be.an('array');
    expect(hotel.availableRooms.length).to.equal(0);
    expect(hotel.availableRooms).to.deep.equal([]);
  });

  it.skip('should have a list of available rooms', () => {
    hotel.setAvailableRooms();
    expect(hotel.availableRooms.length).to.equal()
  })

  it.skip('should have a default value if no rooms are available on a specific date', () => {
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
  })

  it.skip('should be able to filter the list of available rooms based on the room type', () => {
    const filterTerm = 'residential suite';
    const roomsAvailable = [rooms[6], rooms[7]];

    hotel.filterAvailableRoomsByType(filterTerm);

    expect(hotel.filterTerm).to.equal('residential suite');
    expect(hotel.availableRooms.length).to.equal(2);
    expect(hotel.availableRooms).to.deep.equal(roomsAvailable);
  });
});
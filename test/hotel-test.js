import chai from 'chai';
const expect = chai.expect;
import users from './sample-test-data/user-test-data';
import rooms from './sample-test-data/rooms-test-data';
import bookings from './sample-test-data/bookings-test-data';
import Hotel from '../src/classes/Hotel';

describe('Hotel', () => {

  let hotel;
  let todaysDate;
  let usersData = users;
  let roomsData = rooms;
  let bookingsData = bookings;

  beforeEach(() => {
    todaysDate = new Date();
    const timezoneOffset = todaysDate.getTimezoneOffset();

    todaysDate = new Date(todaysDate.getTime() - (timezoneOffset * 60 * 1000));
    todaysDate = todaysDate.toISOString().split('T')[0].split('-').join('/');

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
    expect(hotel.bookings.length).to.equal(8);
  });

  it('should default to an empty list of available rooms', () => {
    const hotel1 = new Hotel();

    expect(hotel1.setAvailableRooms()).to.be.an('array');
    expect(hotel1.setAvailableRooms().length).to.equal(0);
    expect(hotel1.setAvailableRooms()).to.deep.equal([]);
  });

  it('should have a date', () => {
    expect(hotel.convertTodaysDate()).to.equal(todaysDate);
  });

  it('should standardize the date', () => {
    const dateInput = '01/25/2022';
    const standardizedDate = hotel.standardizeDate(dateInput);

    expect(standardizedDate).to.equal('2022/01/25');
  });

  it('should have a default value if no rooms are available on a specific date', () => {
    const dateSearchValue = '2022/01/25';

    const booking1 = {
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 43,
      "date": "2022/01/25",
      "roomNumber": 24,
      "roomServiceCharges": []
    }
    const booking2 = {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 43,
      "date": "2022/01/25",
      "roomNumber": 50,
      "roomServiceCharges": []
    }
    const booking3 = {
      "id": "5fwrgu4i7k55hl6t7",
      "userID": 43,
      "date": "2022/01/25",
      "roomNumber": 51,
      "roomServiceCharges": []
    }
    const room1 = {
      "number": 24,
      "roomType": "residential suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 1,
      "costPerNight": 294.56
    }
    const room2 = {
      "number": 50,
      "roomType": "residential suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 1,
      "costPerNight": 294.56
    }
    const room3 = {
      "number": 51,
      "roomType": "residential suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 1,
      "costPerNight": 294.56
    }

    const bookingsData1 = [booking1, booking2, booking3];
    const roomsData1 = [room1, room2, room3];

    hotel.bookings = bookingsData1;
    hotel.rooms = roomsData1;

    expect(hotel.setAvailableRooms(dateSearchValue)).to.be.an('array');
    expect(hotel.setAvailableRooms(dateSearchValue).length).to.equal(0);
  });

  it('should return a list of rooms on a specific date', () => {
    const dateSearchValue = '2022/01/24';

    expect(hotel.setAvailableRooms(dateSearchValue)).to.be.an('array');
    expect(hotel.setAvailableRooms(dateSearchValue).length).to.equal(8);
  });

  it('should not have rooms available if the room type does not match the input on todays date', () => {
    const filterTerm = 'junior';
    expect(hotel.checkAvailableRoomsByType(filterTerm, todaysDate).length).to.equal(0);
  });

  it('should not have rooms available if the room type does not match the input on a different date', () => {
    const filterTerm = 'junior';
    const dateInput = '2022/01/24';

    expect(hotel.checkAvailableRoomsByType(filterTerm, dateInput));
  })

  it('should be able to filter the list of available rooms based on the room type', () => {
    const filterTerm = 'residential suite';
    const searchDate = '2022/01/25';
    const foundRooms = hotel.checkAvailableRoomsByType(filterTerm, searchDate);

    expect(foundRooms.length).to.equal(4);
  });
});
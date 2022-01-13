import chai from 'chai';
const expect = chai.expect;
import rooms from './sample-test-data/rooms-test-data';
import Room from '../src/classes/Booking';

describe('Room', () => {

  let room;
  let room1 = rooms[0];

  beforeEach(() => {
    room = new Room(room1);
  });

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(room).to.be.an.instanceof(Room);
  });

  it('should have a room number', () => {
    expect(room.number).to.equal(12);
  });

  it.skip('should have a room type', () => {
    expect(room.roomType).to.equal('single room');
  });

  it.skip('should have the option to include a bidet', () => {
    expect(room.bidet).to.equal(false);
  });

  it.skip('should have a bed size', () => {
    expect(room.bedSize).to.equal('twin');
  });

  it.skip('should have a number of beds', () => {
    expect(room.numBeds).to.equal(2);
  });

  it.skip('should have a cost per night', () => {
    expect(room.costPerNight).to.equal(172.09);
  });
});
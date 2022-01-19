import chai from 'chai';
const expect = chai.expect;
import rooms from './sample-test-data/rooms-test-data';
import Room from '../src/classes/Room';

describe('Room', () => {

  let room;
  let room1 = rooms[0];
  let room2;

  beforeEach(() => {
    room = new Room(room1);
    room2 = {
      number: '',
      roomType: '',
      bidet: false,
      bedSize: '',
      numBeds: 0,
      costPerNight: 0
    }
  });

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of Room', () => {
    expect(room).to.be.an.instanceof(Room);
  });

  it('should have a default room number if none is passed in', () => {
    const newRoom = new Room(room2);
    expect(newRoom.number).to.equal(0);
  });

  it('should have a room number', () => {
    expect(room.number).to.equal(12);
  });

  it('should have a default room type', () => {
    const newRoom = new Room(room2);
    expect(newRoom.roomType).to.equal('standard');
  });

  it('should have a room type', () => {
    expect(room.roomType).to.equal('single room');
  });

  it('should have a bidet option', () => {
    expect(room.bidet).to.equal(false);
  });

  it('should have a default bed size', () => {
    const newRoom = new Room(room2);
    expect(newRoom.bedSize).to.equal('standard');
  });

  it('should have a bed size', () => {
    expect(room.bedSize).to.equal('twin');
  });

  it('should have a default number of beds', () => {
    const newRoom = new Room(room2);
    expect(newRoom.numBeds).to.equal(1);
  });

  it('should have a number of beds', () => {
    expect(room.numBeds).to.equal(2);
  });

  it('should have a default cost per night', () => {
    const newRoom = new Room(room2);
    expect(newRoom.costPerNight).to.equal(0);
  });

  it('should have a cost per night', () => {
    expect(room.costPerNight).to.equal(172.09);
  });
});
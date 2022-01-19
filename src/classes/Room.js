class Room {
  constructor(room) {
    this.number = room.number || 0;
    this.roomType = room.roomType || 'standard';
    this.bidet = room.bidet;
    this.bedSize = room.bedSize || 'standard';
    this.numBeds = room.numBeds || 1;
    this.costPerNight = room.costPerNight || 0;
  }
}

export default Room;
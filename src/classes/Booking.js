class Booking {
  constructor(booking) {
    this.id = booking.id;
    this.date = booking.date;
    this.userID = booking.userID;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = [];
  }
}

export default Booking;
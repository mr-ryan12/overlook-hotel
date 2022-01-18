class Booking {
  constructor(booking) {
    this.id = booking.id || '0';
    this.date = booking.date;
    this.userID = booking.userID || 0;
    this.roomNumber = booking.roomNumber || 0;
    this.roomServiceCharges = [];
  }
}

export default Booking;
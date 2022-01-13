class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.bookings = [];
    this.totalSpent = 0;
  }

  addBooking(booking) {
    this.bookings.push(booking);
  }

  calculateTotalSpent(rooms) {
    this.totalSpent = this.bookings.reduce((acc, booking) => {
      let foundRoom = rooms.find(room => room.number === booking.roomNumber)
      acc += foundRoom.costPerNight;
      return acc;
    }, 0);
    return this.totalSpent;
  }
}

export default User;

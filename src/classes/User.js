class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.bookings = [];
    this.totalSpent = 0;
    this.pastBookings = [];
    this.currentBookings = [];
  }

  setBookings(bookings) {
    return this.bookings = bookings.filter(booking => booking.userID === this.id);
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
    return this.totalSpent.toFixed(2);
  }

  findCurrentAndPastBookings(date) {
    const splitTodaysDate = date.split('/');

    this.pastBookings = this.bookings.filter(booking => {
      const splitBookingDate = booking.date.split('/');
      if (splitBookingDate[0] < splitTodaysDate[0]) {
        return booking;
      } else if (splitBookingDate[0] === splitTodaysDate[0] && splitBookingDate[1] < splitTodaysDate[1]) {
        return booking;
      } else if (splitBookingDate[0] === splitTodaysDate[0] && splitBookingDate[1] === splitTodaysDate[1] && splitBookingDate[2] < splitTodaysDate[2]) {
        return booking;
      } else {
        this.currentBookings.push(booking);
      }
    })
    return this.pastBookings;
  }
}

export default User;

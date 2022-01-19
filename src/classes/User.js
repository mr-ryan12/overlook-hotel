class User {
  constructor(user) {
    this.id = user.id || 0;
    this.name = user.name || 'Guest';
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
    const [todaysYear, todaysMonth, todaysDay] = date.split('/');

    this.pastBookings = this.bookings.filter(booking => {
      const [bookingYear, bookingMonth, bookingDay] = booking.date.split('/');
      if (bookingYear < todaysYear) {
        return booking;
      } else if (bookingYear === todaysYear && bookingMonth < todaysMonth) {
        return booking;
      } else if (bookingYear === todaysYear && bookingMonth === todaysMonth && bookingDay < todaysDay) {
        return booking;
      } else {
        this.currentBookings.push(booking);
      }
    })
    return this.pastBookings;
  }
}

export default User;

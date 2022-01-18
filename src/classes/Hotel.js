class Hotel {
  constructor(usersData, roomsData, bookingsData) {
    this.guests = usersData || [];
    this.rooms = roomsData || [];
    this.bookings = bookingsData || [];
    this.date = '';
  }

  convertTodaysDate() {
    let todaysDate = new Date();
    const timezoneOffset = todaysDate.getTimezoneOffset();

    todaysDate = new Date(todaysDate.getTime() - (timezoneOffset * 60 * 1000));
    return todaysDate.toISOString().split('T')[0].split('-').join('/');
  }

  standardizeDate(date) {
    let [a, b, c] = date.replaceAll('-', '/').split('/');
    if (a.length === 4) {
      return [a, b, c].join('/');
    } else {
      return [c, a, b].join('/');
    }
  }

  setAvailableRooms(date) {
    const bookedRooms = this.bookings.reduce((acc, booking) => {
      this.rooms.forEach(room => {
        if (this.standardizeDate(booking.date) === this.standardizeDate(date) && room.number === booking.roomNumber) {
          acc.push(room);
        }
      })
      return acc;
    }, []);

    const availableRooms = this.rooms.reduce((acc, room) => {
      if (!bookedRooms.includes(room)) {
        acc.push(room);
      }
      return acc;
    }, []);
    return availableRooms;
  }

  addBooking(booking) {
    this.bookings.push(booking)
  }

  checkAvailableRoomsByType(term, date) {
    const availableRooms = this.setAvailableRooms(date);
    const foundRooms = availableRooms.filter(room => room.roomType === term);
    
    return foundRooms;
  }
}

export default Hotel;
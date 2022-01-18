class Hotel {
  constructor(usersData, roomsData, bookingsData) {
    this.guests = usersData || [];
    this.rooms = roomsData || [];
    this.bookings = bookingsData || [];
    this.availableRooms = [];
    this.filterTerm = '';
  }

  convertTodaysDate() {
    let todaysDate = new Date();
    const timezoneOffset = todaysDate.getTimezoneOffset();

    todaysDate = new Date(todaysDate.getTime() - (timezoneOffset * 60 * 1000));
    return todaysDate.toISOString().split('T')[0].split('-').join('/');
  }

  setAvailableRooms(date) {
    const bookedRooms = this.bookings.reduce((acc, booking) => {
      this.rooms.forEach(room => {
        if (booking.date === date && room.number === booking.roomNumber) {
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
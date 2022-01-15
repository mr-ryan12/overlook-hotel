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

    this.rooms.forEach(room => {
      if (!bookedRooms.includes(room)) {
        this.availableRooms.push(room);
      }
    })
  }

  checkAvailableRoomsByDate(date) {
    const todaysDate = this.convertTodaysDate();
    const message = 'So sorry, there are not any available rooms. Please adjust your search.';
    let foundRooms;

    if (date < todaysDate) {
      return message;
    } else {
      this.setAvailableRooms(date);
      foundRooms = this.availableRooms;
      return foundRooms;
    }
  }

  checkAvailableRoomsByType(term, date) {
    this.checkAvailableRoomsByDate(date);
    
    const foundRooms = this.availableRooms.filter(room => room.roomType === term);

    if (foundRooms.length === 0) {
      return 'So sorry, there are not any available rooms. Please adjust your search.';
    }
    
    return foundRooms;
  }
}

export default Hotel;
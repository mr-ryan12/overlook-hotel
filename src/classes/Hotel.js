class Hotel {
  constructor(usersData, roomsData, bookingsData) {
    this.guests = usersData || [];
    this.rooms = roomsData || [];
    this.bookings = bookingsData || [];
    this.availableRooms = [];
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
    
  }
}

export default Hotel;
class Hotel {
  constructor(usersData, roomsData, bookingsData) {
    this.guests = usersData || [];
    this.rooms = roomsData || [];
    this.bookings = bookingsData || [];
    this.availableRooms = [];
  }

  setAvailableRooms() {
    
  }
}

export default Hotel;
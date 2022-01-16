const show = elements => elements.forEach(element => element.classList.remove('hidden'));
const hide = elements => elements.forEach(element => element.classList.add('hidden'));


const domUpdates = {
  displayDashboardView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton) {
    hide([availableRoomsContainer]);
    show([pastVisitsContainer, upcomingVisitsContainer]);
    dashboardButton.classList.add('beige');
    availableRoomsButton.classList.remove('beige');
  },

  displayAvailableRoomsView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton) {
    hide([pastVisitsContainer, upcomingVisitsContainer]);
    show([availableRoomsContainer]);
    dashboardButton.classList.remove('beige');
    availableRoomsButton.classList.add('beige');
  },

  displayWelcomeMessage(greeting, totalSpent, customerFirstName) {
    greeting.innerText = `Welcome ${customerFirstName}! You have spent $${totalSpent} so far!`
  },

  // Refactor the below two functions into one
  displayCustomerPastVisits(pastVisitsCardsContainer, customerPastBookings) {
    pastVisitsCardsContainer.innerHTML = '';
    customerPastBookings = customerPastBookings.sort((a, b) => (a.date > b.date) - (a.date < b.date));
    customerPastBookings.forEach(booking => {
      pastVisitsCardsContainer.innerHTML += `
        <section class="past-visits-card">
          <h2 class="room-number">Room Number: ${booking.roomNumber}</h2>
          <h2 class="date-stayed">Stayed On: ${booking.date}</h2>
        </section>`
    })
  },

  displayCustomerCurrentVisits(currentVisitsCardsContainer, customerCurrentBookings) {
    currentVisitsCardsContainer.innerHTML = '';
    customerCurrentBookings = customerCurrentBookings.sort((a, b) => (a.date > b.date) - (a.date < b.date));
    customerCurrentBookings.forEach(booking => {
      currentVisitsCardsContainer.innerHTML += `
        <section class="upcoming-visits-card">
          <h2 class="room-number">Room Number: ${booking.roomNumber}</h2>
          <h2 class="date-stayed">Booked For: ${booking.date}</h2>
        </section>`
    })
  },

  displayAvailableRooms(availableRoomsCardsContainer, availableRooms) {
    availableRoomsCardsContainer.innerHTML = '';
    availableRooms.forEach(room => {
      const splitRoomType = room.roomType.split(' ');
      let convertedType = [];
      splitRoomType.forEach(type => convertedType.push(type.charAt(0).toUpperCase() + type.slice(1)));
      availableRoomsCardsContainer.innerHTML += `
      <section class="available-rooms-card">
        <img class="available-rooms-image" src="./images/main-hotel-image.png" alt="minature picture of a hotel room with a bed and view">
        <section class="room-type-and-price-container">
          <h2 class="room-type">${convertedType.join(' ')}</h2>
          <h2 class="number-of-beds-and-size">${room.numBeds} ${room.bedSize.charAt(0).toUpperCase() + room.bedSize.slice(1)}</h2>
        </section>
        <section class="price-and-book-container">
          <h2 class="price-per-night">Price: $${room.costPerNight.toFixed(2)}/night</h2>
          <button class="book-now-button" id="bookNowButton">Book Now!</button>
        </section>
      </section>`
    })
    this.resetApologeticMessage(apologeticMessageContainer);
  },

  displayApologeticMessage(apologeticMessageContainer) {
    show([apologeticMessageContainer]);
    apologeticMessageContainer.innerText = `So sorry, there are not any rooms available with that criteria. Please try again.`;
  },

  resetApologeticMessage(apologeticMessageContainer) {
    hide([apologeticMessageContainer]);
  },

  clearAvailableRoomsCardsContainer(availableRoomsCardsContainer) {
    availableRoomsCardsContainer.innerHTML = '';
  },

  displayConfirmBookingModal(confirmBookingModal) {
    show([confirmBookingModal])
  }
}

export default domUpdates;
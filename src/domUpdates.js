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

  // Refactor the below two functions into one maybe sort the dates as well
  displayCustomerPastVisits(pastVisitsCardsContainer, customerPastBookings) {
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
    customerCurrentBookings = customerCurrentBookings.sort((a, b) => (a.date > b.date) - (a.date < b.date));
    console.log(customerCurrentBookings)
    customerCurrentBookings.forEach(booking => {
      console.log(booking)
      currentVisitsCardsContainer.innerHTML += `
        <section class="upcoming-visits-card">
          <h2 class="room-number">Room Number: ${booking.roomNumber}</h2>
          <h2 class="date-stayed">Booked For: ${booking.date}</h2>
        </section>`
    })
  }
}

export default domUpdates;
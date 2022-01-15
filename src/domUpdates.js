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
  }
}

export default domUpdates;
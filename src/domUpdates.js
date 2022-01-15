const show = elements => elements.forEach(element => element.classList.remove('hidden'));
const hide = elements => elements.forEach(element => element.classList.add('hidden'));


const domUpdates = {
  displayDashboard(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton) {
    hide([availableRoomsContainer]);
    show([pastVisitsContainer, upcomingVisitsContainer]);
    dashboardButton.classList.add('dark-beige');
    availableRoomsButton.classList.remove('dark-beige');
  },

  displayAvailableRooms(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton) {
    hide([pastVisitsContainer, upcomingVisitsContainer]);
    show([availableRoomsContainer]);
    dashboardButton.classList.remove('dark-beige');
    availableRoomsButton.classList.add('dark-beige');
  }
}

export default domUpdates;
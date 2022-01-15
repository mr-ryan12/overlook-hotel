import './css/base.scss';
import './images/main-hotel-image.png';
import User from './classes/User';
import Hotel from './classes/Hotel';
import domUpdates from './domUpdates';
import {customersData, roomsData, bookingsData} from './apiCalls';

let customer;
let rooms;
let bookings;

const getAllData = () => {
  Promise.all([customersData, roomsData, bookingsData])
    .then(data => {
      customer = new User(data[0].customers[0]);
      setCustomerData(customer, data[1].rooms, data[2].bookings);
      // customer.setBookings(data[2].bookings)
      // customer.calculateTotalSpent(data[1].rooms)
      // customer.findCurrentAndPastBookings('2022/01/14')
    })
    .catch(err => console.log(err))
}

const dashboardButton = document.getElementById('dashboardButton');
const availableRoomsButton = document.getElementById('availableRoomsButton');
const navBarTitleButton = document.getElementById('navBarTitleButton');
const availableRoomsContainer = document.getElementById('availableRoomsContainer');
const pastVisitsContainer = document.getElementById('pastVisitsContainer');
const upcomingVisitsContainer = document.getElementById('upcomingVisitsContainer');
const greeting = document.getElementById('greeting');
const pastVisitsCardsContainer = document.getElementById('pastVisitsCardsContainer')

const formatDates = date => {
  const dateObj = new Date(date);
  console.log(dateObj)
  return new Intl.DateTimeFormat('en-US').format(dateObj);
}

const setCustomerData = (customer, rooms, bookings) => {
  const hotel = new Hotel();
  const todaysDate = hotel.convertTodaysDate();
  const customerFirstName = customer.name.split(' ')[0];

  customer.setBookings(bookings);
  customer.findCurrentAndPastBookings(todaysDate);

  const customerPastBookings = customer.pastBookings.filter(booking => booking.date = formatDates(booking.date));
  console.log(customerPastBookings);
  const customerCurrentBookings = customer.currentBookings.filter(booking => booking.date = formatDates(booking.date));
  const totalSpent = customer.calculateTotalSpent(rooms);

  domUpdates.displayWelcomeMessage(greeting, totalSpent, customerFirstName);
  domUpdates.displayCustomerPastVisits(pastVisitsCardsContainer, customerPastBookings);
}

































window.addEventListener('load', getAllData);
dashboardButton.addEventListener('click', () => {
  domUpdates.displayDashboardView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
});

navBarTitleButton.addEventListener('click', () => {
  domUpdates.displayDashboardView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
});

availableRoomsButton.addEventListener('click', () => {
  domUpdates.displayAvailableRoomsView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
});



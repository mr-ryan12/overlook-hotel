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
      getAvailableRoomsWithoutInputs(data[0].customers, data[1].rooms, data[2].bookings);
    })
    .catch(err => console.log(err))
}

const greeting = document.getElementById('greeting');
const roomTypesInput = document.getElementById('roomTypes');
const submitButton = document.getElementById('submitButton');
const dashboardButton = document.getElementById('dashboardButton');
const customerDateInput = document.getElementById('searchRoomsByDate');
const navBarTitleButton = document.getElementById('navBarTitleButton');
const pastVisitsContainer = document.getElementById('pastVisitsContainer');
const availableRoomsButton = document.getElementById('availableRoomsButton');
const availableRoomsContainer = document.getElementById('availableRoomsContainer');
const upcomingVisitsContainer = document.getElementById('upcomingVisitsContainer');
const pastVisitsCardsContainer = document.getElementById('pastVisitsCardsContainer');
const availableRoomsCardsContainer = document.getElementById('availableRoomsCardsContainer')
const currentVisitsCardsContainer = document.getElementById('upcomingVisitsCardsContainer');

const formatDates = date => {
  const splitDate = date.split('/');
  return [splitDate[1], splitDate[2], splitDate[0]].join('/');
}

const setCustomerData = (customer, rooms, bookings) => {
  const hotel = new Hotel();
  const todaysDate = hotel.convertTodaysDate();
  const customerFirstName = customer.name.split(' ')[0];

  customer.setBookings(bookings);
  customer.findCurrentAndPastBookings(todaysDate);

  const customerPastBookings = customer.pastBookings.filter(booking => booking.date = formatDates(booking.date));
  const customerCurrentBookings = customer.currentBookings.filter(booking => booking.date = formatDates(booking.date));
  const totalSpent = customer.calculateTotalSpent(rooms);

  domUpdates.displayWelcomeMessage(greeting, totalSpent, customerFirstName);
  domUpdates.displayCustomerPastVisits(pastVisitsCardsContainer, customerPastBookings);
  domUpdates.displayCustomerCurrentVisits(currentVisitsCardsContainer, customerCurrentBookings);
}


const getAvailableRoomsWithoutInputs = (customers, rooms, bookings) => {
  const hotel = new Hotel(customers, rooms, bookings);
  const todaysDate = hotel.convertTodaysDate();
  
  hotel.setAvailableRooms(todaysDate);

  const availableRooms = hotel.availableRooms;
  
  domUpdates.displayAvailableRooms(availableRoomsCardsContainer, availableRooms);
}

const getAvailableRoomsByInputs = (customers, rooms, bookings) => {
  const hotel = new Hotel(customers, rooms, bookings);
  const todaysDate = hotel.convertTodaysDate();
  const filteredRooms = [];
  const filterTerm = roomTypesInput.value;
  const dateInput = customerDateInput.value;

  if (filterTerm === '' && dateInput === '') {
    domUpdates.displayAvailableRoomsView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
  }
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

submitButton.addEventListener('click', getAvailableRoomsByInputs)

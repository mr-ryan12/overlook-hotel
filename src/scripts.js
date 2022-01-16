import './css/base.scss';
import './images/main-hotel-image.png';
import User from './classes/User';
import Hotel from './classes/Hotel';
import domUpdates from './domUpdates';
import {customersData, roomsData, bookingsData} from './apiCalls';

let customer;
let hotel;

const getAllData = () => {
  Promise.all([customersData, roomsData, bookingsData])
    .then(data => {
      customer = new User(data[0].customers[0]);
      hotel = new Hotel(data[0].customers, data[1].rooms, data[2].bookings)
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
const apologeticMessageContainer = document.querySelector('.apologetic-message-container');

const formatDates = date => {
  const splitDate = date.split('/');
  return [splitDate[1], splitDate[2], splitDate[0]].join('/');
}

const setCustomerData = (customer, rooms, bookings) => {
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


const getAvailableRoomsWithoutInputs = () => {
  const todaysDate = hotel.convertTodaysDate();
  hotel.setAvailableRooms(todaysDate);

  const availableRooms = hotel.setAvailableRooms(todaysDate);
  domUpdates.displayAvailableRooms(availableRoomsCardsContainer, availableRooms);
}

const getAvailableRoomsWithInputs = () => {
  const todaysDate = hotel.convertTodaysDate();
  const filterTerm = roomTypesInput.value;
  let filteredRoomsByDate;
  let dateInput = customerDateInput.value.split('-').join('/');
  let filteredRoomsByType = hotel.checkAvailableRoomsByType(filterTerm, todaysDate);

  console.log(filteredRoomsByDate)
  
  const newBookings = hotel.bookings.filter(booking => booking.date === '2022/01/25')
  console.log(newBookings)
  if (filterTerm !== '' && dateInput === '') {
    displayFilterResults(filteredRoomsByType);
    // resetInputs();
  } else if(filterTerm === '' && dateInput !== '' && dateInput >= todaysDate) {
    filteredRoomsByDate = hotel.setAvailableRooms(dateInput);
    console.log(filteredRoomsByDate)
    displayFilterResults(filteredRoomsByDate);
    // resetInputs();
  } else {
    domUpdates.displayAvailableRoomsView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
  }
  console.log(dateInput)
  console.log(filterTerm)
}

const displayFilterResults = filteredRoomsByInput => {
  domUpdates.displayAvailableRooms(availableRoomsCardsContainer, filteredRoomsByInput);
  domUpdates.displayAvailableRoomsView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
  filteredRoomsByInput.length === 0 ? domUpdates.displayApologeticMessage(apologeticMessageContainer) : domUpdates.resetApologeticMessage(apologeticMessageContainer);
}

const resetInputs = () => {
  roomTypesInput.value = '';
  customerDateInput.value = '';
}






























window.addEventListener('load', getAllData);
dashboardButton.addEventListener('click', () => {
  domUpdates.displayDashboardView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
});
navBarTitleButton.addEventListener('click', () => {
  domUpdates.displayDashboardView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
});
availableRoomsButton.addEventListener('click', () => {
  domUpdates.displayAvailableRooms(availableRoomsCardsContainer, hotel.setAvailableRooms(hotel.convertTodaysDate()))
  domUpdates.displayAvailableRoomsView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
});

submitButton.addEventListener('click', getAvailableRoomsWithInputs)

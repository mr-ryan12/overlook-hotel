import './css/base.scss';
import './images/main-hotel-image.png';
import User from './classes/User';
import Hotel from './classes/Hotel';
import Booking from './classes/Booking';
import domUpdates from './domUpdates';
import {customersData, roomsData, bookingsData, createBooking, fetchIndividualCustomer} from './apiCalls';

let customers;
let hotel;
let bookings;
let rooms;
let individualCustomer;

const getAllData = () => {
  Promise.all([customersData(), roomsData(), bookingsData()])
    .then(data => {
      customers = new User(data[0].customers[0]);
      hotel = new Hotel(data[0].customers, data[1].rooms, data[2].bookings);
      bookings = data[2].bookings;
      rooms = data[1].rooms;
    })
    .catch(error => {
      bookingMessage.innerText = 'Sorry, something went wrong. Please try again.';
      domUpdates.displayModal();
      console.log(error)
    })
}


const greeting = document.getElementById('greeting');
const closeModalButton = document.getElementById('closeModalButton');
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
const confirmBookingModal = document.querySelector('.confirm-booking-modal-container');
const bookingMessage = document.getElementById('bookingMessage');
const loginButton = document.getElementById('loginButton');
const usernameInput = document.getElementById('name');
const passwordInput = document.getElementById('password');
const invalidLoginMessage = document.getElementById('loginErrorMessage');
const showPasswordCheckbox = document.getElementById('showPassword');
const emptyAvailableRoomsContainer = document.getElementById('emptyAvailableRoomsContainer');

const formatDates = date => {
  const splitDate = date.split('/');
  return [splitDate[1], splitDate[2], splitDate[0]].join('/');
}

const setCustomerData = (customer, rooms, bookings) => {
  const todaysDate = hotel.convertTodaysDate();
  const customerFirstName = customer.name.split(' ')[0];
  
  customer.setBookings(bookings);
  customer.findCurrentAndPastBookings(todaysDate);
  
  // create below into helper function - pass in customer
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
  addEventListenersToBookNowButtons();
}

const getAvailableRoomsWithInputs = () => {
  let filteredRoomsByDate;
  let filteredRoomsByType;
  let dateInput = customerDateInput.value.split('-').join('/');
  const todaysDate = hotel.convertTodaysDate();
  const filterTerm = roomTypesInput.value;
  
  if (filterTerm !== '' && dateInput === '') {
    filteredRoomsByType = hotel.checkAvailableRoomsByType(filterTerm, todaysDate);
    autofillCurrentDate();
    displayFilterResults(filteredRoomsByType);
  } else if (filterTerm === '' && dateInput !== '') {
    dateInput < todaysDate ? domUpdates.displayApologeticMessage(apologeticMessageContainer) : filteredRoomsByDate = hotel.setAvailableRooms(dateInput);
    filteredRoomsByDate ? displayFilterResults(filteredRoomsByDate) : domUpdates.clearAvailableRoomsCardsContainer(availableRoomsCardsContainer);
  } else if (filterTerm !== '' && dateInput !== '') {
    checkBothInputs(dateInput, todaysDate, filteredRoomsByType, filterTerm);
  } else {
    autofillCurrentDate();
    domUpdates.displayAvailableRoomsView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
  }
  checkAvailableRoomsContainer();
  roomTypesInput.value = '';
}

const displayFilterResults = filteredRoomsByInput => {
  domUpdates.displayAvailableRooms(availableRoomsCardsContainer, filteredRoomsByInput);
  domUpdates.displayAvailableRoomsView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
  filteredRoomsByInput.length === 0 ? domUpdates.displayApologeticMessage(apologeticMessageContainer) : domUpdates.resetApologeticMessage(apologeticMessageContainer);
  addEventListenersToBookNowButtons();
}

const resetInputs = () => {
  roomTypesInput.value = '';
  customerDateInput.value = '';
}

const autofillCurrentDate = () => {
  const todaysDate = hotel.convertTodaysDate().split('/').join('-');
  customerDateInput.value = todaysDate;
}

const checkBothInputs = (dateInput, todaysDate, filteredRoomsByType, filterTerm) => {
  if (filterTerm !== '' && dateInput !== '' && dateInput < todaysDate) {
    domUpdates.displayApologeticMessage(apologeticMessageContainer);
    domUpdates.clearAvailableRoomsCardsContainer(availableRoomsCardsContainer);
  } else if (filterTerm !== '' && dateInput !== '' && dateInput >= todaysDate) {
    filteredRoomsByType = hotel.checkAvailableRoomsByType(filterTerm, dateInput);
    displayFilterResults(filteredRoomsByType);
  }
}

const createNewBooking = event => {
  const roomNumber = Number(event.target.parentNode.parentNode.id);
  const bookingDate = customerDateInput.value.split('-').join('/');
  const newBookingData = {
    userID: individualCustomer.id,
    date: bookingDate,
    roomNumber: roomNumber,
  }
  createBooking(newBookingData)
  .then(data => {
    const customerFirstName = individualCustomer.name.split(' ')[0];
    const totalSpent = individualCustomer.calculateTotalSpent(rooms);
    const newCustomerCurrentBooking = new Booking(data.newBooking);
    const newHotelBooking = new Booking(data.newBooking);

    domUpdates.displayModal(confirmBookingModal);
    newCustomerCurrentBooking.date = formatDates(data.newBooking.date);
    individualCustomer.currentBookings.push(newCustomerCurrentBooking);
    individualCustomer.bookings.push(newCustomerCurrentBooking);
    hotel.addBooking(newHotelBooking);
    domUpdates.displayWelcomeMessage(greeting, totalSpent, customerFirstName);
    domUpdates.displayAvailableRooms(availableRoomsCardsContainer, hotel.setAvailableRooms(bookingDate));
    domUpdates.displayCustomerCurrentVisits(currentVisitsCardsContainer, individualCustomer.currentBookings);
    addEventListenersToBookNowButtons();
    console.log(hotel.setAvailableRooms(bookingDate))
    console.log(availableRoomsCardsContainer.childNodes.length)
    checkAvailableRoomsContainer();
  })
  .catch(error => {
    bookingMessage.innerText = 'Sorry, something went wrong. Please try again.';
    domUpdates.displayModal(confirmBookingModal);
    console.log(error)
  })
}

const showPassword = () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

const displaySuccessfulLoginView = event => {
  event.preventDefault();
  const usernameInputValue = usernameInput.value;
  const usernameId = Number(usernameInputValue.split('r')[1]);
  const passwordInputValue = passwordInput.value;
  const foundGuest = hotel.guests.find(guest => guest.id === usernameId);

  if (foundGuest && passwordInputValue === 'overlook2021') {
    fetchIndividualCustomer(usernameId)
      .then(data => {
        individualCustomer = new User(data);
        setCustomerData(individualCustomer, rooms, bookings);
        getAvailableRoomsWithoutInputs();
        domUpdates.displayUserDashboard(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
      });
  } else {
    domUpdates.displayInvalidLoginMessage(invalidLoginMessage);
  }
}

const checkAvailableRoomsContainer = () => {
  availableRoomsCardsContainer.childNodes.length === 0 ? domUpdates.displayNoMoreRoomsMessage(emptyAvailableRoomsContainer) : domUpdates.hideNoMoreRoomsMessage(emptyAvailableRoomsContainer);
}

const addEventListenersToBookNowButtons = () => {
  const allBookNowButtons = document.querySelectorAll('.book-now-button');
  allBookNowButtons.forEach(button => button.addEventListener('click', createNewBooking));
}

window.addEventListener('load', getAllData);
window.addEventListener('load', domUpdates.displayLoginView);
showPasswordCheckbox.addEventListener('click', showPassword);
loginButton.addEventListener('click', displaySuccessfulLoginView);
dashboardButton.addEventListener('click', () => {
  domUpdates.displayDashboardView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
  domUpdates.resetApologeticMessage(apologeticMessageContainer);
});
navBarTitleButton.addEventListener('click', () => {
  domUpdates.displayDashboardView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
  domUpdates.resetApologeticMessage(apologeticMessageContainer)
});
availableRoomsButton.addEventListener('click', () => {
  domUpdates.displayAvailableRooms(availableRoomsCardsContainer, hotel.setAvailableRooms(hotel.convertTodaysDate()))
  domUpdates.displayAvailableRoomsView(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
  checkAvailableRoomsContainer();
  resetInputs();
  autofillCurrentDate();
  addEventListenersToBookNowButtons();
});
submitButton.addEventListener('click', getAvailableRoomsWithInputs);
closeModalButton.addEventListener('click', () => {
  domUpdates.closeModal(confirmBookingModal);
})

import './css/base.scss';
import './images/main-hotel-image.png';
import User from './classes/User';
import Hotel from './classes/Hotel';
import Booking from './classes/Booking';
import domUpdates from './domUpdates';
// import {customersData, roomsData, bookingsData, createBooking} from './apiCalls';
import {getCustomersData, getRoomsData, getBookingsData, createBooking} from './apiCalls';


let customer;
let hotel;

const getAllData = () => {
  // return Promise.all([customersData, roomsData, bookingsData])
  Promise.all([getCustomersData(), getRoomsData(), getBookingsData()])
    .then(data => {
      console.log(data)
      customer = new User(data[0].customers[0]);
      hotel = new Hotel(data[0].customers, data[1].rooms, data[2].bookings);
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
const confirmBookingModal = document.querySelector('.confirm-booking-modal-container');

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
  console.log(bookingDate)
  const newBookingData = {
    userID: customer.id,
    date: bookingDate,
    roomNumber: roomNumber,
    roomServiceCharges: []
  }
  createBooking(newBookingData)
  .then(data => {
    // const modifiedBooking = data.newBooking;
    // const modifiedBooking = new Booking(data.newBooking);
    const modifiedBooking = {
      id: data.newBooking.id,
      userID: data.newBooking.userID,
      date: data.newBooking.date,
      roomNumber: data.newBooking.roomNumber,
      roomServiceCharges: []
    }
    console.log(modifiedBooking)
    // modifiedBooking.date = formatDates(modifiedBooking.date);
    customer.currentBookings.push(modifiedBooking);
    customer.bookings.push(modifiedBooking);
    hotel.addBooking(modifiedBooking);
    // console.log(hotel.bookings)
    console.log(hotel.setAvailableRooms(bookingDate));
    const customerCurrentBookings = customer.currentBookings;
    domUpdates.displayCustomerCurrentVisits(currentVisitsCardsContainer, customerCurrentBookings);
    domUpdates.displayAvailableRooms(availableRoomsCardsContainer, hotel.setAvailableRooms(bookingDate));
    addEventListenersToBookNowButtons();
    // hotel.setAvailableRooms(bookingDate)
    // console.log(data)
    console.log(hotel.bookings)
  })
  .catch(error => console.log(error))
}

const addEventListenersToBookNowButtons = () => {
  const allBookNowButtons = document.querySelectorAll('.book-now-button');
  allBookNowButtons.forEach(button => button.addEventListener('click', createNewBooking));
}

window.addEventListener('load', getAllData);
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
  resetInputs();
  autofillCurrentDate();
  addEventListenersToBookNowButtons();
});

submitButton.addEventListener('click', getAvailableRoomsWithInputs)

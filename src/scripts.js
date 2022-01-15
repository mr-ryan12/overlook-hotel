import './css/base.scss';
import './images/main-hotel-image.png';
import domUpdates from './domUpdates';
import {customersData, roomsData, bookingsData} from './apiCalls';

let customer;
let rooms;
let bookings;

const getAllData = () => {
  Promise.all([customersData, roomsData, bookingsData])
    .then(data => console.log(data))
    .catch(err => console.log(err))
}






const dashboardButton = document.getElementById('dashboardButton');
const availableRoomsButton = document.getElementById('availableRoomsButton');
const navBarTitleButton = document.getElementById('navBarTitleButton');
const availableRoomsContainer = document.getElementById('availableRoomsContainer');
const pastVisitsContainer = document.getElementById('pastVisitsContainer');
const upcomingVisitsContainer = document.getElementById('upcomingVisitsContainer');


































window.addEventListener('load', getAllData);
dashboardButton.addEventListener('click', () => {
  domUpdates.displayDashboard(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
});

navBarTitleButton.addEventListener('click', () => {
  domUpdates.displayDashboard(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
});

availableRoomsButton.addEventListener('click', () => {
  domUpdates.displayAvailableRooms(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
});



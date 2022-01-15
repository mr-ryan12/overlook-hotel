import './css/base.scss';
import './images/main-hotel-image.png';
import domUpdates from './domUpdates';
import {customersData, roomsData, bookingsData} from './apiCalls';

const dashboardButton = document.getElementById('dashboardButton');
const availableRoomsButton = document.getElementById('availableRoomsButton');
const navBarTitleButton = document.getElementById('navBarTitleButton');
const availableRoomsContainer = document.getElementById('availableRoomsContainer');
const pastVisitsContainer = document.getElementById('pastVisitsContainer');
const upcomingVisitsContainer = document.getElementById('upcomingVisitsContainer');

dashboardButton.addEventListener('click', () => {
  domUpdates.displayDashboard(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
});

navBarTitleButton.addEventListener('click', () => {
  domUpdates.displayDashboard(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton);
});

availableRoomsButton.addEventListener('click', () => {
  domUpdates.displayAvailableRooms(availableRoomsContainer, pastVisitsContainer, upcomingVisitsContainer, dashboardButton, availableRoomsButton);
});



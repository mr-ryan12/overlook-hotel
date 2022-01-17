import domUpdates from './domUpdates';

const getData = api => {
  return fetch(`http://localhost:3001/api/v1/${api}`)
    .then(response => checkForErrors(response));
}

const customersData = getData('customers');
const roomsData = getData('rooms');
const bookingsData = getData('bookings');

const createBooking = data => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json'}
  })
  .then(response => checkForErrors(response))
}

const checkForErrors = response => {
  if (response.ok) {
    return response.json();
  } else {
    domUpdates.displayModal();
    throw new Error('Something went wrong. Please try again.');
  }
}

export {customersData, roomsData, bookingsData, createBooking}

import domUpdates from './domUpdates';

const getData = api => {
  return fetch(`http://localhost:3001/api/v1/${api}`)
    .then(response => checkForErrors(response));
}

const getCustomersData = () => {
  return getData('customers');
}

// const getCustomersData = customerId => {
//   return getData(`customers/${customerId}`);
// }

const getRoomsData = () => {
  return getData('rooms');
}

const getBookingsData = () => {
  return getData('bookings')
}

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

export {getCustomersData, getRoomsData, getBookingsData, createBooking}

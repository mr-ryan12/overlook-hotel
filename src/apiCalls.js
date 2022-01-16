const getData = api => {
  return fetch(`http://localhost:3001/api/v1/${api}`)
    .then(response => response.json());
}

const createBooking = data => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json'}
  })
  .then(response => throwError(response))
}

const throwError = response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Something went wrong. Please try again.');
  }
}

const customersData = getData('customers');
const roomsData = getData('rooms');
const bookingsData = getData('bookings');

export {customersData, roomsData, bookingsData};

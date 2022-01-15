const getData = api => {
  fetch(`http://localhost:3001/api/v1/${api}`)
    .then(response => response.json());
}

const customersData = getData('customers');
const roomsData = getData('rooms');
const bookingsData = getData('bookings');

export {customersData, roomsData, bookingsData};

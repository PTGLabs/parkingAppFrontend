import React, { useEffect } from 'react';
import './viewBooking.css';

interface Booking {
  area: string;
  spot: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  duration: string;
}
const userData = localStorage.getItem('user');
let user;
if (userData) {
   user = JSON.parse(userData);
  console.log("local",user);
} else {
  console.log('No user data found');
}

let bookings: Booking[] =user.bookings;

const ViewBooking: React.FC = () => {

  const startingFunc = () => {
    const userData = localStorage.getItem("user");
    let user;
    if (userData) {
      user = JSON.parse(userData);
      console.log("local", user);
    } else {
      console.log("No user data found");
    }

    bookings = user.bookings;
  };

  useEffect(() => {
    startingFunc();
  }, []);
  return (
    <div className="create-booking">
      <h1>Create Booking</h1>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Area</th>
            <th>Spot</th>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.spot}>
              <td>{booking.area}</td>
              <td>{booking.spot}</td>
              <td>{booking.createdAt}</td>
              <td>{booking.startTime}</td>
              <td>{booking.endTime}</td>
              <td>{booking.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBooking;

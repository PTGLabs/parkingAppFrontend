import React, { useState } from "react";
import axios from "axios";

interface PropInterface {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;}

interface User {
  id: String;
}


const userData = localStorage.getItem("user");
let user;
if (userData) {
  user = JSON.parse(userData);
  console.log("local", user);
} else {
  console.log("No user data found");
}
const User: User = user;

const CreateBooking: React.FC<PropInterface> = ({setActiveTab}) => {
  const [area, setArea] = useState("");
  const [spot, setSpot] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  console.log("statess", area, spot, startTime, endTime);

  const CreateBooking = async (obj: any) => {
    console.log("working");

    try {
      const response = await axios
        .patch(`http://192.168.1.106:3006/api/user/${User.id}`, obj)
        .then(async (res: any) => {
          console.log("booking", res.data);
          localStorage.setItem('user', JSON.stringify(res.data))
          setActiveTab('viewParking')
        });
    } catch (err: any) {
      console.log(
        `Err in getParking function: `,
        err.response.data.errors[0].message
      );
      alert(err.response)
    }
  };

  const handleBooking = () => {
    const sT = startTime.split(":")[0];
    const eT = endTime.split(":")[0];
    if(area && spot && startTime && endTime){
    if (parseInt(sT) < parseInt(eT)) {
      const duration = parseInt(eT) - parseInt(sT);
      const obj = {
        bookings: [
          {
            area: area,
            spot: spot,
            startTime: startTime,
            endTime: endTime,
            duration: `${duration}h`,
          },
        ],
      };
      console.log("handle",obj);

      CreateBooking(obj);
    } else {
      alert("The start time should be smaller then the end Time");
    }
  }else{
    alert("Must fill all the fields")
  }
  };

  return (
    <div className="create-booking-container">
      <h2>Create Booking</h2>
      <div className="create-booking-form" >
        <div className="form-group">
          <label htmlFor="area-input">Area</label>
          <input
            type="text"
            id="area-input"
            onChange={(e) => setArea(e.target.value)}
            name="area"
            placeholder="Enter area"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="spot-input">Spot</label>
          <input
            type="text"
            id="spot-input"
            onChange={(e) => setSpot(e.target.value)}
            name="spot"
            placeholder="Enter spot"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time-from-input">Time From</label>
          <input
            type="text"
            pattern="\d{2}:\d{2}"
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="00:00 (in range from 00:00 to 24:00"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time-to-input">Time To</label>
          <input
            type="text"
            pattern="\d{2}:\d{2}"
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="00:00 (in range from 00:00 to 24:00"
            required
          />
        </div>
        <button onClick={handleBooking}>
          Book Parking
        </button>
      </div>
    </div>
  );
};

export default CreateBooking;

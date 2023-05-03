import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateBooking from "./createBooking";
import ViewBooking from "./viewBooking";
import "./viewParking.css";
import axios from "axios";

interface HomePageProps {
  // onLogout: () => void;
}
interface ParkingSpot {
  empty?: boolean;
  spot?: String;
  booked?: Boolean;
}
const ViewParking: React.FC<HomePageProps> = () => {
  const [activeTab, setActiveTab] = useState("viewParking");
  const [activeArea, setActiveArea] = useState("Area 1");
  const [areaOneData, setAreaOneData] = useState<ParkingSpot[]>([]);
  const [areaTwoData, setAreaTwoData] = useState<ParkingSpot[]>([]);
  const [areaThreeData, setAreaThreeData] = useState<ParkingSpot[]>([]);

  console.log("Areaaass", areaOneData, areaTwoData, areaThreeData);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleAreaClick = (areaName: string) => {
    setActiveArea(areaName);
  };

  const navigate = useNavigate();

  const GetParking = async () => {
    try {
      const response = await axios
        .get(`http://192.168.1.106:3006/api/parking`)
        .then(async (res: any) => {
          console.log("parking", res.data.result);
          const response = res.data.result;
          const obj = {
            empty: true,
          };
          const area1 = response.filter((e: any) => e.area === "1");
          area1.sort((a: { spot: string }, b: { spot: string }) => {
            return parseInt(a.spot) - parseInt(b.spot);
          });

          const area2 = response.filter((e: any) => e.area === "2");

          area2.sort((a: { spot: string }, b: { spot: string }) => {
            return parseInt(a.spot) - parseInt(b.spot);
          });
          area2.splice(4, 0, obj);
          area2.splice(5, 0, obj);
          area2.splice(10, 0, obj);
          area2.splice(11, 0, obj);
          area2.splice(12, 0, obj);
          area2.splice(13, 0, obj);

          const area3 = response.filter((e: any) => e.area === "3");

          area3.sort((a: { spot: string }, b: { spot: string }) => {
            return parseInt(a.spot) - parseInt(b.spot);
          });
          area3.splice(4, 0, obj);
          area3.splice(5, 0, obj);
          area3.splice(6, 0, obj);
          area3.splice(8, 0, obj);
          area3.splice(9, 0, obj);
          area3.splice(10, 0, obj);
          area3.splice(13, 0, obj);
          area3.splice(14, 0, obj);

          setAreaOneData(area1);
          setAreaTwoData(area2);
          setAreaThreeData(area3);
        });
    } catch (err: any) {
      console.log(
        `Err in getParking function: `,
        err.response.data.errors[0].message
      );
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    GetParking();
  }, []);

  return (
    <div className="home-page">
      <div className="header">
        <h1 className="logo">Parking App</h1>
        <button onClick={() => logout()} className="logout-button">
          Logout
        </button>
      </div>
      <div className="tab-bar">
        <button
          className={`tab-button ${
            activeTab === "viewParking" ? "active" : ""
          }`}
          onClick={() => handleTabClick("viewParking")}
        >
          View Parking
        </button>
        <button
          className={`tab-button ${
            activeTab === "bookParking" ? "active" : ""
          }`}
          onClick={() => handleTabClick("bookParking")}
        >
          Book Parking
        </button>
        <button
          className={`tab-button ${
            activeTab === "viewBookings" ? "active" : ""
          }`}
          onClick={() => handleTabClick("viewBookings")}
        >
          View Bookings
        </button>
      </div>
      {activeTab === "viewParking" ? (
        <div className="content">
          <div className="left-column">
            <button
              className={`area-button ${
                activeArea === "Area 1" ? "active" : ""
              }`}
              onClick={() => handleAreaClick("Area 1")}
            >
              Area 1
            </button>
            <button
              className={`area-button ${
                activeArea === "Area 2" ? "active" : ""
              }`}
              onClick={() => handleAreaClick("Area 2")}
            >
              Area 2
            </button>
            <button
              className={`area-button ${
                activeArea === "Area 3" ? "active" : ""
              }`}
              onClick={() => handleAreaClick("Area 3")}
            >
              Area 3
            </button>
          </div>
          <div className="right-column">
            {activeArea === "Area 1"
              ? areaOneData?.map((e, index) =>
                  !e?.empty ? (
                    <div
                      key={index}
                      style={
                        e.booked
                          ? { backgroundColor: "red" }
                          : { backgroundColor: "white" }
                      }
                      className="parking-spot"
                    >
                      Parking Spot {e.spot}
                    </div>
                  ) : (
                    <div className="empty-spot"></div>
                  )
                )
              : activeArea === "Area 2"
              ? areaTwoData?.map((e, index) =>
                  !e?.empty ? (
                    <div
                      key={index}
                      style={
                        e.booked
                          ? { backgroundColor: "red" }
                          : { backgroundColor: "white" }
                      }
                      className="parking-spot"
                    >
                      Parking Spot {e.spot}
                    </div>
                  ) : (
                    <div className="empty-spot"></div>
                  )
                )
              : areaThreeData?.map((e, index) =>
                  !e?.empty ? (
                    <div
                      key={index}
                      style={
                        e.booked
                          ? { backgroundColor: "red" }
                          : { backgroundColor: "white" }
                      }
                      className="parking-spot"
                    >
                      Parking Spot {e.spot}
                    </div>
                  ) : (
                    <div className="empty-spot"></div>
                  )
                )}
          </div>
        </div>
      ) : activeTab === "bookParking" ? (
        <CreateBooking setActiveTab = {setActiveTab}/>
      ) : (
        <ViewBooking />
      )}
    </div>
  );
};

export default ViewParking;

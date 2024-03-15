import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [status, setStatus] = useState("Offline");
  const [crop, setCrop] = useState("Tomato");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const [result, setResult] = useState("");

  useEffect(() => {
    const Interval = setInterval(async () => {
      await getStatus();
    }, 5000);

    return () => clearInterval(Interval);
  }, []);

  const getStatus = async () => {
    const res = await axios.get(
      "https://blynk.cloud/external/api/isHardwareConnected?token=R3M1sgd-gX-nSv6okWCI5TXV23Lte360"
    );
    // console.log(res);
    if (res.data) {
      setStatus("Online");
    } else {
      setStatus("Offline");
    }
  };

  const handleCheck = async () => {
    if (status === "Offline") {
      setVisible(true);
      setResult("Device is Offline");
      return;
    }

    const res = await axios.get(
      "https://blynk.cloud/external/api/getAll?token=R3M1sgd-gX-nSv6okWCI5TXV23Lte360"
    );

    const sensorData = {
      soil_moisture: res.data.v3,
      temperature: res.data.v0,
      humidity: res.data.v1,
      motion: res.data.v5,
    };

    console.log(
      sensorData.soil_moisture +
        " " +
        sensorData.temperature +
        " " +
        sensorData.humidity +
        " " +
        sensorData.motion
    );

    let newResult = "";

    switch (crop) {
      case "Tomato":
        if (sensorData.soil_moisture > 80) {
          newResult += ` Soil Moisture is High ${sensorData.soil_moisture}`;
        } else if (sensorData.soil_moisture < 60) {
          newResult += ` Soil Moisture is Low ${sensorData.soil_moisture}`;
        }
        if (sensorData.temperature > 24) {
          newResult += ` Temperature is High ${sensorData.temperature}`;
        } else if (sensorData.temperature < 21) {
          newResult += ` Temperature is Low ${sensorData.temperature}`;
        }
        if (sensorData.humidity > 85) {
          newResult += ` humidity is High ${sensorData.humidity}`;
        } else if (sensorData.humidity < 60) {
          newResult += ` humidity is Low ${sensorData.humidity}`;
        }
        break;

      case "Potato":
        if (sensorData.soil_moisture > 75) {
          newResult += ` Soil Moisture is High ${sensorData.soil_moisture}`;
        } else if (sensorData.soil_moisture < 60) {
          newResult += ` Soil Moisture is Low ${sensorData.soil_moisture}`;
        }
        if (sensorData.temperature > 24) {
          newResult += ` Temperature is High ${sensorData.temperature}`;
        } else if (sensorData.temperature < 18) {
          newResult += ` Temperature is Low ${sensorData.temperature}`;
        }
        if (sensorData.humidity > 90) {
          newResult += ` humidity is High ${sensorData.humidity}`;
        } else if (sensorData.humidity < 80) {
          newResult += ` humidity is Low ${sensorData.humidity}`;
        }
        break;

      case "Brinjal":
        if (sensorData.soil_moisture > 80) {
          newResult += ` Soil Moisture is High ${sensorData.soil_moisture}`;
        } else if (sensorData.soil_moisture < 70) {
          newResult += ` Soil Moisture is Low ${sensorData.soil_moisture}`;
        }
        if (sensorData.temperature > 21) {
          newResult += ` Temperature is High ${sensorData.temperature}`;
        } else if (sensorData.temperature < 13) {
          newResult += ` Temperature is Low ${sensorData.temperature}`;
        }
        if (sensorData.humidity > 90) {
          newResult += ` humidity is High ${sensorData.humidity}`;
        } else if (sensorData.humidity < 85) {
          newResult += ` humidity is Low ${sensorData.humidity}`;
        }
        break;

      case "Chilli":
        if (sensorData.soil_moisture > 80) {
          newResult += ` Soil Moisture is High ${sensorData.soil_moisture}`;
        } else if (sensorData.soil_moisture < 70) {
          newResult += ` Soil Moisture is Low ${sensorData.soil_moisture}`;
        }
        if (sensorData.temperature > 21) {
          newResult += ` Temperature is High ${sensorData.temperature}`;
        } else if (sensorData.temperature < 13) {
          newResult += ` Temperature is Low ${sensorData.temperature}`;
        }
        if (sensorData.humidity > 90) {
          newResult += ` humidity is High ${sensorData.humidity}`;
        } else if (sensorData.humidity < 85) {
          newResult += ` humidity is Low ${sensorData.humidity}`;
        }
        break;

      default:
        break;
    }
    if(newResult === "")
     newResult="Suitable Conditions";

    setVisible(true);
    setResult(newResult);
  };

  return (
    <div className="home">
      <div className="info">
        <h1 className="title">CROP HEALTH TESTER</h1>
        <div className="info-subcontainer">
          <div className="info-item">
            <h4 className="item-heading">Device Name</h4>
            <p className="item-content">Balcony Tomato</p>
          </div>
          <div className="info-item">
            <h4 className="item-heading">Device Status</h4>
            <p
              className={`item-content ${
                status === "Online" ? "green" : "red"
              }`}
            >
              {status}
            </p>
          </div>
          <div className="info-item">
            <h4 className="item-heading">Select Crop</h4>
            <select
              id="crop"
              className="item-content select"
              onChange={(e) => setCrop(e.target.value)}
            >
              <option value="Tomato">Tomato</option>
              <option value="Potato">Potato</option>
              <option value="Brinjal">Brinjal</option>
              <option value="Chilli">Chilli</option>
            </select>
          </div>
        </div>
        <button className="button" onClick={handleCheck}>
          Check Status
        </button>

        {visible && (
          <div
            className={`result ${
              result === "Suitable Conditions" ? "bg-green" : "bg-red"
            }`}
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

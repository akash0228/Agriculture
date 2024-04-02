import React, { useState } from "react";
import "./Leaf.css";
import axios from "axios";

const Leaf = () => {
  const [crop, setCrop] = useState("Tomato");
  const [result, setResult] = useState("");
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState();
  function handleChange(e) {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      const formData = new FormData();
      formData.append("image", selectedFile); // Key should be 'image' (matches Flask API)
      setFile(formData); // Update state with FormData
      setResult(""); // Clear previous result if any
      setVisible(false);
    } else {
      setResult("Please upload a JPG file.");
      setVisible(true);
    }
  }

  const handleCheck = async () => {
    if (!file) {
      setResult("Please upload a JPG file.");
      setVisible(true);
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/process_image",
          file // Send the FormData object directly
        );
        console.log(res); // Log the response data
        setResult(res.data.result);
        setVisible(true);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="home">
      <div className="info">
        <h1 className="title">LEAF CONDITION TESTER</h1>
        <div className="info-subcontainer">
          <div className="info-item">
            <h4 className="item-heading">Select Crop</h4>
            <select
              id="crop"
              className="item-content select-leaf"
              onChange={(e) => setCrop(e.target.value)}
            >
              <option value="Tomato">Grape</option>
              <option value="Potato">Potato</option>
              <option value="Brinjal">Brinjal</option>
              <option value="Chilli">Chilli</option>
            </select>
          </div>
        </div>
        <input className="input-leaf" type="file" onChange={handleChange} />

        <button className="button" onClick={handleCheck}>
          Check Status
        </button>

        {visible && (
          <div
            className={`result ${
              result === "Upload Correct Image" ? "bg-red" : "bg-red"
            }`}
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaf;

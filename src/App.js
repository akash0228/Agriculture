import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Leaf from "./pages/Leaf";

function App() {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="app">
      <div className="toggle">
        <button
          className={`toggle_btn condition ${toggle?"active":""}`}
          onClick={() => setToggle(true)}
        >
          Condition
        </button>
        <button
          className={`toggle_btn condition ${toggle?"":"active"}`}
          onClick={() => setToggle(false)}
        >
          Leaf
        </button>
      </div>
      {toggle ? <Home /> : <Leaf />}
    </div>
  );
}

export default App;

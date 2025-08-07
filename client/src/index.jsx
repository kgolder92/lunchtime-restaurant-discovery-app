import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./style.css";

const App = () => {
  useEffect(() => {
    axios
      .get("/restaurants/test")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <h1 className="title">Hey hey testerr</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

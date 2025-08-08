import React, { useEffect } from "react";
import { useUserLocation } from "./hooks/useUserLocation";
import ReactDOM from "react-dom/client";
// import Header from "./components/Header/Header.jsx";
import Discover from "./pages/Discover";
import "./style.css";
import "./styles/global.scss";

const App = () => {
  // useEffect(() => {
  //   axios
  //     .get("/restaurants/test")
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  const { location } = useUserLocation();
  return (
    <main className={StyleSheet.appContainer}>
      {/* <Header /> */}
      {location ? (
        <Discover initialLocation={location} />
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

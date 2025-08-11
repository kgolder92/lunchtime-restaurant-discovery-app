import React from "react";
import { useUserLocation } from "./hooks/useUserLocation";
import ReactDOM from "react-dom/client";
import { APIProvider } from "@vis.gl/react-google-maps";
import Discover from "./pages/Discover";
import "./style.css";
import "./styles/global.scss";

const App = () => {
  const { location, isReady } = useUserLocation();
  return (
    <main className={StyleSheet.appContainer}>
      {/* <Header /> */}
      {location ? (
        <APIProvider
          apiKey={process.env.GOOGLE_PLACES_API_KEY}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <Discover
            initialLocation={location}
            isReady={isReady}
            libraries={["marker"]}
          />
        </APIProvider>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

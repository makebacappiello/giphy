import React, { useEffect, useState } from "react";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

function App() {
  const [gifs, setGifs] = useState([]);
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GIPHY_API_KEY; // reads the key from your .env file (Create React App's way)
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=m1kTQ8UcExx5o3RGKmPX8ixQfKD2neEE&limit=24&rating=g"
    )
      .then((response) => response.json())
      .then((responseData) => setGifs(responseData.data))
      .catch((error) => console.log("Error fetching and parsing data", error));
  }, []);
  return (
    <div>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">GifSearch</h1>
          <SearchForm />
        </div>
      </div>
      <div className="main-content">
        <GifList />
      </div>
    </div>
  );
}

export default App;

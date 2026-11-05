import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

function App() {
  const apiKey = process.env.REACT_APP_GIPHY_API_KEY;

  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("candy");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let activeFetch = true;
    //setTimeout part 1
    // setTimeout(() => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=24&rating=g`
      )
      .then((response) => {
        if (activeFetch) {
          // console.log(response.data);
          //handle success
          setGifs(response.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        //handle error
        console.error("Error fetching and parsing data", error);
      })
      .finally(() => {
        console.log("Request completed");
      });
    //part 2 of set timeout
    // }
    // , Math.ceil(Math.random() * 10000));
    return () => {
      activeFetch = false;
    };
  }, [query]);
  //.........THIS IS AXIOS..........

  //........................................

  //...........DELETED PORTION fetch ..........
  // const apiKey = process.env.REACT_APP_GIPHY_API_KEY; // reads the key from your .env file (Create React App's way)
  // fetch(
  //   "https://api.giphy.com/v1/gifs/trending?api_key=m1kTQ8UcExx5o3RGKmPX8ixQfKD2neEE&limit=24&rating=g"
  // )
  //   .then((response) => response.json())
  //   .then((responseData) => setGifs(responseData.data))
  //   .catch((error) => console.log("Error fetching and parsing data", error));
  //....................................

  const handleQueryChange = (searchText) => {
    setQuery(searchText);
  };
  return (
    <div>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">GifSearch</h1>
          <SearchForm changeQuery={handleQueryChange} />
        </div>
      </div>
      <div className="main-content">
        {loading ? <p>Loading...</p> : <GifList data={gifs} />}
      </div>
    </div>
  );
}

export default App;

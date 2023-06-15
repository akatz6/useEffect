import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import RickAndMorty from "./RickAndMorty";

function App() {
  const [holiday, setHoliday] = useState([]);
  const [rickAndMorty, setRickAndMorty] = useState([]);

  useEffect(() => {
    // using axios
    // https://www.npmjs.com/package/axios

    const getHolidays = async () => {
      const response = await axios.get(
        "https://date.nager.at/api/v2/publicholidays/2023/US"
      );
      const info = response.data;
      setHoliday(info);
    };

    const getRickAndMorty = async () => {
      //using fetch
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character?page=1"
        );
        const data = await response.json();
        setRickAndMorty(data.results);
      } catch (e) {
        console.log(e);
      }
    };
    getHolidays();
    getRickAndMorty();
  }, []);

  return (
    <>
      <div>
        {holiday.map((element) => {
          return <p key={element.date}> {element.name}</p>;
        })}
      </div>
      <div>
        {rickAndMorty.map((element) => {
          return (
            <RickAndMorty
              key={element.id}
              name={element.name}
              img={element.image}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;

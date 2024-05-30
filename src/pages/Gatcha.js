import React, { useState, useEffect } from "react";
import axios from "axios";

const Gatcha = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/location-area"
        );
        setLocations(response.data.results);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleGatcha = async () => {
    try {
      const timeOfDay = new Date().getHours() < 18 ? "day" : "night";
      console.log("Time of day:", timeOfDay);
      console.log("Selected location:", selectedLocation);

      // Fetch encounter data for the selected location
      const locationResponse = await axios.get(
        `https://pokeapi.co/api/v2/location-area/${selectedLocation}`
      );
      const encounterData = locationResponse.data;

      // Choose a random encounter
      const encounters = encounterData.pokemon_encounters;
      const randomEncounter =
        encounters[Math.floor(Math.random() * encounters.length)];

      // Fetch Pokemon details
      const pokemonResponse = await axios.get(randomEncounter.pokemon.url);
      const pokemon = pokemonResponse.data;
      console.log("Pokemon:", pokemon.sprites.front_default);

      setResult({
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        timeOfDay,
        gender: Math.random() < 0.5 ? "female" : "male", // Randomly assign gender
      });
    } catch (error) {
      console.error("Error fetching encounter data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon Gatcha</h1>
      <select
        className="border p-2"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="">Select a location</option>
        {locations.map((location) => (
          <option
            key={location.url}
            value={location.url.split("/").slice(-2, -1)}
          >
            {location.name}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white p-2 ml-2"
        onClick={handleGatcha}
        disabled={!selectedLocation}
      >
        Gatcha!
      </button>
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-bold capitalize">{result.name}</h2>
          <p>Time of Day: {result.timeOfDay}</p>
          <p>Gender: {result.gender}</p>
          <img src={`${result.image}`} alt={result.name} />
        </div>
      )}
    </div>
  );
};

export default Gatcha;

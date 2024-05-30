import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import AbilityEffect from './components/AbilityEffect';
import Gatcha from './pages/Gatcha';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [selectedAbility, setSelectedAbility] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
      setPokemon(response.data);
      setSelectedAbility(null);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <Link to="/" className="text-blue-500">Home</Link>
          <Link to="/gatcha" className="text-blue-500 ml-4">Gatcha</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <div>
              <h1 className="text-2xl font-bold mb-4">Pokémon Search</h1>
              <SearchBar onSearch={handleSearch} />
              {pokemon && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="col-span-1">
                    <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <div>
                      <h3 className="text-lg font-bold">Abilities:</h3>
                      <ul className="list-disc list-inside">
                        {pokemon.abilities.map(({ ability }) => (
                          <li key={ability.name} className="capitalize">
                            <button 
                              className="text-blue-500"
                              onClick={() => setSelectedAbility(ability.url)}
                            >
                            {ability.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                      {selectedAbility && <AbilityEffect url={selectedAbility} />}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <h3 className="text-lg font-bold">Types:</h3>
                    <ul className="list-disc list-inside">
                      {pokemon.types.map(({ type }) => (
                        <li key={type.name} className="capitalize">{type.name}</li>
                      ))}
                    </ul>
                    <h3 className="text-lg font-bold">Stats:</h3>
                    <ul className="list-disc list-inside">
                      {pokemon.stats.map(({ stat, base_stat }) => (
                        <li key={stat.name} className="capitalize">{stat.name}: {base_stat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          } />
          <Route path="/gatcha" element={<Gatcha />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = () => {
    if (selectedPokemon) {
      onSearch(selectedPokemon);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <select 
        className="border p-2" 
        value={selectedPokemon}
        onChange={(e) => setSelectedPokemon(e.target.value)}
      >
        <option value="">Select a Pokemon</option>
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name}>
            {pokemon.name}
          </option>
        ))}
      </select>
      <button 
        className="bg-blue-500 text-white p-2"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

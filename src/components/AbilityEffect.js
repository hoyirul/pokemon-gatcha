import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AbilityEffect = ({ url }) => {
  const [effect, setEffect] = useState('');

  useEffect(() => {
    const fetchEffect = async () => {
      try {
        const response = await axios.get(url);
        const effectEntry = response.data.effect_entries.find(entry => entry.language.name === 'en');
        setEffect(effectEntry ? effectEntry.effect : 'No effect information available.');
      } catch (error) {
        console.error('Error fetching ability effect:', error);
      }
    };

    fetchEffect();
  }, [url]);

  return (
    <div className="mt-2">
      <h3 className="text-lg font-bold">Ability Effect:</h3>
      <p>{effect}</p>
    </div>
  );
};

export default AbilityEffect;

import './styles/base.css';
import { useState, useEffect } from 'react';
import GameBoard from './components/Game-Board';

function App() {
  // Get Images
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const characterNames = [
      'President Curtis',
      'Mr. Meeseeks',
      'Balthromaw',
      'Ants in my Eyes Johnson',
      'Mr. Poopybutthole',
      'Cornvelious Daniel',
      'Dr. Xenon Bloom',
      'Squanchy',
    ];

    async function fetchAllCharacters() {
      let allCharacters = [];
      let nextUrl = 'https://rickandmortyapi.com/api/character';

      try {
        while (nextUrl) {
          const response = await fetch(nextUrl);
          const data = await response.json();
          allCharacters = allCharacters.concat(data.results);
          nextUrl = data.info.next;
        }

        // Filter characters by your list
        const filteredCharacters = allCharacters
          .filter((character) => characterNames.includes(character.name))
          .map((character) => ({
            id: character.id,
            name: character.name,
            image: character.image,
          }));

        setCharacters(filteredCharacters);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchAllCharacters();
  }, []);

  // Remember selected images
  const [selectedCards, setSelectedCards] = useState([]);
  function selectCard(character) {
    const key = character.id;
    if (selectedCards.includes(key)) {
      console.log('game over');
    } else {
      setSelectedCards([...selectedCards, key]);
    }
  }
  console.log('Selected Cards', selectedCards);

  return (
    <>
      <main>
        <GameBoard characters={characters} selectCard={selectCard} />
      </main>
    </>
  );
}

export default App;

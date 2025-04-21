import './styles/base.css';
import { useState, useEffect } from 'react';
import GameBoard from './components/Game-Board';

function App() {
  // Get Images
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // choose which characters get chosen
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

    // fetch character images
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

        setCharacters(shuffleCards(filteredCharacters));
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
      setCharacters(shuffleCards(characters));
    }
  }

  // shuffle cards
  function shuffleCards(arrayToShuffle) {
    let array = arrayToShuffle;
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <>
      <main>
        <GameBoard characters={characters} selectCard={selectCard} />
      </main>
    </>
  );
}

export default App;

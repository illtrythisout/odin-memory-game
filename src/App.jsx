import './styles/base.css';
import { useState, useEffect } from 'react';
import GameBoard from './components/Game-Board';
import ScoreBoard from './components/Score-Board';

function App() {
  // Get Images
  const [characters, setCharacters] = useState([]);

  // Api fetching
  const [loadingStatus, setLoadingStatus] = useState('Loading...');

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
      'Scary Terry',
      'Armagheadon',
      'Gazorpazorpfield',
      'Unity',
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
        setLoadingStatus('loaded');
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingStatus(
          'There was an error fetching data, check console for info'
        );
      }
    }

    fetchAllCharacters();
  }, []);

  // Remember selected images & keep score
  const [selectedCards, setSelectedCards] = useState([]);
  const [highScore, setHighScore] = useState(0);
  function selectCard(character) {
    const key = character.id;
    if (selectedCards.includes(key)) {
      setSelectedCards([]);
      console.log('game over');
    } else {
      setSelectedCards([...selectedCards, key]);
      setCharacters(shuffleCards(characters));

      // set high score
      if (selectedCards.length >= highScore) setHighScore((n) => n + 1);
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
        <ScoreBoard
          score={selectedCards.length}
          highScore={highScore}
        ></ScoreBoard>
        <GameBoard
          characters={characters}
          selectCard={selectCard}
          loadingStatus={loadingStatus}
        />
      </main>
    </>
  );
}

export default App;

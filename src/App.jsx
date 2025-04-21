import './styles/base.css';
import { useState } from 'react';
import GameBoard from './components/Game-Board';

function App() {
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedCards, setSelectedCards] = useState([]);

  console.log(selectedCards);

  function selectCard(key) {
    if (selectedCards.includes(key)) {
      console.log('game over');
    } else {
      setSelectedCards([...selectedCards, key]);
    }
  }

  return (
    <>
      <main>
        <GameBoard images={images} selectCard={selectCard} />
      </main>
    </>
  );
}

export default App;

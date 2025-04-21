import '../styles/game-board.css';
import Card from './Card';

function GameBoard({ characters, selectCard }) {
  return (
    <div className="game-board container-div">
      {characters.map((character) => {
        return (
          <Card
            character={character}
            selectCard={() => selectCard(character)}
            key={character.id}
          />
        );
      })}
    </div>
  );
}

export default GameBoard;

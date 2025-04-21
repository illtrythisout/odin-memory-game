import '../styles/game-board.css';
import Card from './Card';

function GameBoard({ characters, selectCard, loadingStatus }) {
  if (loadingStatus !== 'loaded') {
    return (
      <div className="container-div">
        <p>{loadingStatus}</p>
      </div>
    );
  }
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

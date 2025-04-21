import '../styles/game-board.css';
import Card from './Card';

function GameBoard({ images, selectCard }) {
  return (
    <div className="game-board">
      {images.map((img) => {
        return <Card img={img} selectCard={() => selectCard(img)} key={img} />;
      })}
    </div>
  );
}

export default GameBoard;

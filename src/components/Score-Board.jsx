import '../styles/score-board.css';

function ScoreBoard({ score, highScore }) {
  return (
    <div className="score-board container-div">
      <span>
        Score: <b>{score}</b>
      </span>
      <span>
        High Score: <b>{highScore}</b>
      </span>
    </div>
  );
}

export default ScoreBoard;

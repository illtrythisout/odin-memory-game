import '../styles/card.css';

function Card({ img, selectCard }) {
  return (
    <button className="card" onClick={selectCard}>
      <p>{img}</p>
    </button>
  );
}

export default Card;

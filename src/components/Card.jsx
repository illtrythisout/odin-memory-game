import '../styles/card.css';

function Card({ character, selectCard }) {
  return (
    <button className="card" onClick={() => selectCard(character)}>
      <img
        src={character.image}
        alt={`Rick and Morty character: ${character.name}`}
      />
      <p>{name}</p>
    </button>
  );
}

export default Card;

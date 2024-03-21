import "./card.css";

function Card({ pokemon, onClick }) {
  return (
    <div className="card" onClick={() => onClick(pokemon.id)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  );
}

export default Card;

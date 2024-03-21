import "./card.css";

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function Card({ pokemon, onClick }) {
  const name = capitalize(pokemon.name);
  return (
    <div className="card" onClick={() => onClick(pokemon.id)}>
      <img src={pokemon.sprites.front_default} alt={name} />
      <p>{name}</p>
    </div>
  );
}

export default Card;

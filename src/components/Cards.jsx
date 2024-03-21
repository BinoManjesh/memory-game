import "./cards.css";
import Card from "./Card";

function Cards({ pokemonList, onCardClick }) {
  return (
    <div className="cards">
      {pokemonList.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} onClick={onCardClick} />
      ))}
    </div>
  );
}

export default Cards;

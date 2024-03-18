import Card from "./Card";

function Cards({ pokemonList }) {
  return (
    <div className="cards">
      {pokemonList.map((pokemon) => (
        <Card
          key={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.front_default}
        />
      ))}
    </div>
  );
}

export default Cards;

import { useEffect, useState } from "react";
import Cards from "./components/Cards";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/35/")
      .then((response) => response.json())
      .then((json) => setPokemonList([json]))
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return <Cards pokemonList={pokemonList} />;
}

export default App;

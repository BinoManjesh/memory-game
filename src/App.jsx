import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import { randomSelection } from "./utils";

const totalPokemon = 20;
const onScreen = 10;

function fetchPokemonList() {
  const promises = [];
  for (const id of randomSelection(1, 1025, totalPokemon)) {
    const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(
      (response) => response.json()
    );
    promises.push(promise);
  }
  return Promise.all(promises);
}

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [chosen, setChosen] = useState(new Set());
  const [bestScore, setBestScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("Render");

  function onCardClick(id) {
    if (chosen.has(id)) {
      console.log("Game over!");
      setChosen(new Set());
      setPokemonList([]);
    } else {
      const newChosen = new Set(chosen);
      newChosen.add(id);
      setChosen(newChosen);
      if (newChosen.size > bestScore) {
        setBestScore(newChosen.size);
      }
    }
  }

  useEffect(() => {
    if (pokemonList.length === 0) {
      let cancel = false;
      fetchPokemonList()
        .then((pokemonList) => {
          if (!cancel) setPokemonList(pokemonList);
        })
        .catch((error) => {
          setErrorMessage("Something went wrong!");
          console.log(error);
        });
      return () => {
        cancel = true;
      };
    }
  }, [pokemonList]);

  if (errorMessage) {
    return <p className="error">{errorMessage}</p>;
  } else if (pokemonList.length) {
    const screenPokemon = [];
    for (const index of randomSelection(0, totalPokemon - 1, onScreen)) {
      screenPokemon.push(pokemonList[index]);
    }
    return (
      <>
        <p>
          Score: {chosen.size}, Best Score: {bestScore}
        </p>
        <Cards pokemonList={screenPokemon} onCardClick={onCardClick} />
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default App;

import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import { randomSelection } from "./utils";
import Score from "./components/Score";

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
  const [highScore, sethighScore] = useState(0);
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
      if (newChosen.size > highScore) {
        sethighScore(newChosen.size);
      }
    }
  }

  function selectPokemon() {
    const selection = [];
    for (const index of randomSelection(0, totalPokemon - 1, onScreen)) {
      selection.push(pokemonList[index]);
    }
    return selection;
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

  return (
    <>
      <Score score={chosen.size} highScore={highScore} />
      {errorMessage ? (
        <p className="error">{errorMessage}</p>
      ) : pokemonList.length ? (
        <>
          <p>
            Choose a Pokemon to increase your score. The game ends if you choose
            the same Pokemon twice!
          </p>
          <Cards onCardClick={onCardClick} pokemonList={selectPokemon()} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;

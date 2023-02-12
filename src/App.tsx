import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { initAxios } from './axios.config';
import { PokemonList } from './pages/pokemonsList/pokemonsList';

function App() {
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);

  useEffect(() => {
    initAxios()
    setIsSetupCompleted(true)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {isSetupCompleted && (
          <>
            <PokemonList />
          </>
        )}
      </header>
    </div>
  );
}

export default App;

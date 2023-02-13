import './App.scss';
import { useEffect, useState } from 'react';
import { initAxios } from './axios.config';
import { PokemonListPage } from './pages/pokemonsList/pokemonList';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { PokemonInfoPage } from './pages/pokemonInfo/pokemonInfo';
import { ComparisonPage } from './pages/comparison/comparison';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonListPage />,
    errorElement: <h1>404 Not Found</h1>,
  },
  {
    path: "pokemon-info/:id",
    element: <PokemonInfoPage />,
  },
  {
    path: "compare/:pokemon1/:pokemon2",
    element: <ComparisonPage />,
  },
]);

function App() {
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);

  useEffect(() => {
    initAxios()
    setIsSetupCompleted(true)
  }, [])

  return (
    <>
      <div className="App">
        {isSetupCompleted && <RouterProvider router={router} />}
      </div>
    </>
  );
}

export default App;

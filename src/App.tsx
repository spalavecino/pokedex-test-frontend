import './App.scss';
import { useEffect, useState } from 'react';
import { initAxios } from './axios.config';
import { PokemonListPage } from './pages/pokemonsList/pokemonList';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { PokemonInfoPage } from './pages/pokemonInfo/pokemonInfo';

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
        {/* {isSetupCompleted && (
          <>
            <PokemonListPage page={page} />
          </>
        )} */}
      </div>
    </>
  );
}

export default App;

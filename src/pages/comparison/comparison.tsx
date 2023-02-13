import { useNavigate, useParams } from 'react-router-dom'
import { useGetPokemonDetail, useGetPokemonSpecie } from '../../hooks/useFetchData';

export const ComparisonPage = () => {
    let { pokemon1, pokemon2 } = useParams();
    const pokemonInfo1 = useGetPokemonDetail(pokemon1!!)
    const pokemonInfo2 = useGetPokemonDetail(pokemon2!!)
    const pokemonSpecieInfo1 = useGetPokemonSpecie(pokemon1!!)
    const pokemonSpecieInfo2 = useGetPokemonSpecie(pokemon2!!)
    const navigate = useNavigate();

    return (
        <>
            <header className="App-header"></header>
            <button onClick={() => navigate(-1)}>Go Back</button>
            <h1>Comparison</h1>
        </>
    )
}
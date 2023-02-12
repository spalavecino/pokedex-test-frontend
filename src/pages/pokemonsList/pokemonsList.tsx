import { useGetPokemons } from "../../hooks/useFetchData"
import { PokemonDetail } from "./pokemonDetail/pokemonDetail"

export const PokemonList = () => {
    const pokemons = useGetPokemons()

    return (
        <>
            <h1>Pokemon List</h1>
            {!!pokemons?.results.length && pokemons!!.results.map(pokemon => (
                <PokemonDetail pokemon={pokemon} />
            ))}
        </>
    )
}
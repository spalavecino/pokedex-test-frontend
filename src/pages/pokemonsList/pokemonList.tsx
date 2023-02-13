import { useEffect, useMemo, useRef, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce";
import { useGetPokemons } from "../../hooks/useFetchData"
import { PokemonDetail } from "./pokemonDetail/pokemonDetail"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './pokemonList.scss'

export const PokemonListPage = () => {
    const [pokemonsToCompare, setPokemonsToCompare] = useState<Array<string>>([])
    const [page, setPage] = useState(0);
    const [input, setInput] = useState('')
    const pokemons = useGetPokemons(page)
    const inputRef = useRef(null);
    const debouncedInput = useDebounce(input, 800)
    const navigate = useNavigate();
    const enabledComparison = pokemonsToCompare.length === 2

    const handleCheckComparison = (pokemonUrl: string) => {
        if (pokemonsToCompare.includes(pokemonUrl)) {
            setPokemonsToCompare(pokemonsToCompare.filter(p => p !== pokemonUrl))
        } else {
            setPokemonsToCompare([...pokemonsToCompare, pokemonUrl])
        }
    }

    const goToCompare = () => {
        const pokemonIds = pokemonsToCompare.map(p => p.replace(`${axios.defaults.baseURL!!}pokemon/`, ''))
        navigate(`compare/${pokemonIds[0]}${pokemonIds[1]}`)
    }

    const filteredPokemons = useMemo(() => {
        if (debouncedInput && debouncedInput.length > 2) {
            const debounceLowerCase = debouncedInput.toLowerCase()
            return pokemons?.filter(pokemon => pokemon.name.toLowerCase().includes(debounceLowerCase))
        }
        return pokemons
    }, [debouncedInput, pokemons])

    const handleScroll = () => {
        const height = document.documentElement.scrollHeight
        const scrolled = document.documentElement.scrollTop
        const windowHeight = window.innerHeight

        if (windowHeight + scrolled + 1 >= height) {
            setPage(prevPage => prevPage + 1)
        }
    }

    const handleOnChangeSearchInput = ((e: any) => {
        setInput(e.target.value);
    })

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <header className="App-header">
                <input
                    onChange={handleOnChangeSearchInput}
                    placeholder='Search'
                    value={input}
                    ref={inputRef}
                    type='text'
                />
            </header>
            {!!filteredPokemons?.length && filteredPokemons.map((pokemon, i) => (
                <>
                    <input
                        type="checkbox"
                        key={pokemon.url}
                        checked={pokemonsToCompare.includes(pokemon.url)}
                        onChange={() => handleCheckComparison(pokemon.url)}
                        disabled={enabledComparison && !pokemonsToCompare.includes(pokemon.url)}
                    />
                    <PokemonDetail pokemon={pokemon} key={pokemon.url} />
                </>
            ))}
            {enabledComparison && (
                <footer className="PokemonList__footer">
                    <button className="PokemonList__button-compare" onClick={goToCompare}>Compare</button>
                </footer>
            )}
        </>
    )
}
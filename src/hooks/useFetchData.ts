import { useCallback, useEffect, useState } from "react"
import axios from 'axios'
import { useMockerContext } from "..";
import { pokemonsMock } from "../mocks/pokemonsMock";
import { pokemonDetailMock } from "../mocks/pokemonDetailMock";
import { PokemonInfo, PokemonItemResponse, PokemonsResponse } from '../types';
import { LIMIT_GET_POKEMONS } from '../utils';

export const useFetchData = <Data>(url: string, mockedData: Data): Data | undefined => {
    const [result, setResult] = useState<Data>();
    const { mock } = useMockerContext()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get<Data>(url);
            setResult(data)
        }

        if (!mock) {
            fetchData().catch(e => {
                console.error(e)
            })
        } else {
            setResult(mockedData)
        }

    }, [url])

    return result
}

export const useGetPokemons = (offset: number) => {
    const urlWithParams = `pokemon?offset=${offset * LIMIT_GET_POKEMONS}&limit=${LIMIT_GET_POKEMONS}`
    const [pokemons, setPokemons] = useState<Array<PokemonItemResponse>>([])
    const fetchedPokemons = useFetchData<PokemonsResponse>(urlWithParams, pokemonsMock)

    const updatePokemons = useCallback((newPokemons: Array<PokemonItemResponse>) => {
        setPokemons([...pokemons, ...newPokemons])
    }, [pokemons])

    useEffect(() => {
        if (fetchedPokemons) updatePokemons(fetchedPokemons.results)
    }, [fetchedPokemons])

    return pokemons
}

export const useGetPokemonDetail = (url: string) => {
    let finalUrl = ''

    try {
        new URL(url)
        finalUrl = url
    } catch (e) {
        finalUrl = `pokemon/${url}`
    } finally {
        return useFetchData<PokemonInfo>(finalUrl, pokemonDetailMock)
    }
}

export const useGetPokemonSpecie = (id: string) => useFetchData<any>(`pokemon-species/${id}`, {})
import axios from 'axios'
import { useEffect, useState } from "react"
import { useMockerContext } from "..";
import { pokemonsMock } from "../mocks/pokemonsMock";
import { pokemonDetailMock } from "../mocks/pokemonDetailMock";
import { PokemonInfo, PokemonsResponse } from '../types';

export const useFetchData = <Data>(url: string, mockedData: Data, queryParams = {}): Data | undefined => {
    const [result, setResult] = useState<Data>();
    const { mock } = useMockerContext()

    useEffect(() => {
        const fetchData = async () => {
            const queryParamsString = Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&')
            const { data } = await axios.get<Data>(`${url}?${queryParamsString}`);
            setResult(data)
        }

        if (!mock) {
            fetchData().catch(e => {
                console.log(e)
            })
        } else {
            setResult(mockedData)
        }

    }, [url])

    return result
}

export const useGetPokemons = (offset: number = 0) => useFetchData<PokemonsResponse>('pokemon', pokemonsMock, { offset, limit: 20 })

export const useGetPokemonDetail = (url: string) => {
    const partialUrl = url.replace(axios.defaults.baseURL!!, '')
    return useFetchData<PokemonInfo>(partialUrl, pokemonDetailMock)
}
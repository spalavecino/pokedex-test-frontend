import React from "react"
import { useGetPokemonDetail } from "../../../hooks/useFetchData"
import { PokemonItemResponse } from "../../../types"
import { PokemonBasicStats } from "./pokemonBasicStats"
import './pokemonDetail.scss'

interface PokemonDetailProps {
    pokemon: PokemonItemResponse
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
    const pokemonInfo = useGetPokemonDetail(pokemon.url)

    return (
        <>
            {pokemonInfo && (
                <article className="PokemonDetail">
                    <img src={pokemonInfo.sprites.other["official-artwork"].front_default} />
                    <div className="PokemonDetail__info-container">
                        <h6 className="PokemonDetail__name">{pokemonInfo.name}</h6>
                        <label className="PokemonDetail__types">{pokemonInfo.types.map(({ type }) => type.name).join(' / ')}</label>
                        <PokemonBasicStats
                            id={pokemonInfo.id}
                            maxHp={100}
                            maxCp={150}
                        />
                    </div>
                </article>
            )}
        </>
    )
}
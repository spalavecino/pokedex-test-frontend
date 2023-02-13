import React from "react"
import { useGetPokemonDetail } from "../../../hooks/useFetchData"
import { PokemonItemResponse } from "../../../types"
import { PokemonBasicStats } from "./pokemonBasicStats"
import { useNavigate } from 'react-router-dom'
import './pokemonDetail.scss'

interface PokemonDetailProps {
    pokemon: PokemonItemResponse
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
    const pokemonInfo = useGetPokemonDetail(pokemon.url)
    const navigate = useNavigate();

    return (
        <>
            {pokemonInfo && (
                <article className="PokemonDetail" onClick={() => navigate(`pokemon-info/${pokemonInfo.id}`)}>
                    <img className="pokemon" src={pokemonInfo.sprites.other["official-artwork"].front_default} />
                    <div className="info-container">
                        <h6 className="PokemonDetail__name">{pokemonInfo.name}</h6>
                        <label className="PokemonDetail__types">{pokemonInfo.types.map(({ type }) => type.name).join(' / ')}</label>
                        <PokemonBasicStats
                            id={pokemonInfo.id}
                            maxHp={100}
                            maxCp={150}
                        />
                        <div className="row-info">
                            <span>Height: <b>~ {pokemonInfo.height / 10}m</b></span>
                            <span>Generation: <b>~ {pokemonInfo.weight / 10}kg</b></span>
                        </div>
                        <div className="row-info">
                            <span>Weight : <b>~ {pokemonInfo.weight / 10}kg</b></span>
                        </div>
                    </div>
                </article>
            )}
        </>
    )
}
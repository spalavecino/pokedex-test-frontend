import { useParams } from 'react-router-dom';
import { useGetPokemonDetail, useGetPokemonSpecie } from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom'
import './pokemonInfo.scss'
import { PokemonBasicStats } from '../pokemonsList/pokemonDetail/pokemonBasicStats';
import { useMemo } from 'react';

export const PokemonInfoPage = () => {
    let { id } = useParams();
    const pokemonInfo = useGetPokemonDetail(id!!)
    const pokemonSpecieInfo = useGetPokemonSpecie(id!!)
    const navigate = useNavigate();
    const moves = useMemo(() => pokemonInfo?.moves.splice(0, 8).map(({ move }) => move.name), [pokemonInfo])

    return (
        <>
            <header className="App-header"></header>
            <button onClick={() => navigate(-1)}>Go Back</button>
            {pokemonInfo && pokemonSpecieInfo && (
                <article className='PokemonInfo'>
                    <h1 className='PokemonInfo__name'>{pokemonInfo.name}</h1>
                    <div className='flex'>
                        <img className="pokemon" src={pokemonInfo.sprites.other["official-artwork"].front_default} />
                        <div className="info-container">
                            <p className='PokemonInfo__description'>{pokemonSpecieInfo.flavor_text_entries[0].flavor_text}</p>
                        </div>
                    </div>
                    <div className="info-container">
                        <label className="PokemonDetail__types">{pokemonInfo.types.map(({ type }) => type.name).join(' / ')}</label>
                        <PokemonBasicStats
                            id={pokemonInfo.id}
                            maxHp={100}
                            maxCp={150}
                        />
                        <div className="row-info">
                            <span>Height: <b>~ {pokemonInfo.height / 10}m</b></span>
                            <span>Shape: <b> {pokemonSpecieInfo.shape.name}</b></span>
                        </div>
                        <div className="row-info">
                            <span>Weight : <b>~ {pokemonInfo.weight / 10}kg</b></span>
                            <span>Color : <b> {pokemonSpecieInfo.color.name}</b></span>
                        </div>
                    </div>
                    <div>
                        <div className="row-info">
                            <span>Generation: <b> {pokemonSpecieInfo.generation.name}</b></span>
                            <span>Habitat: <b> {pokemonSpecieInfo.habitat.name}</b></span>
                        </div>
                    </div>
                    <br /><br />
                    <div className='container-info'>
                        <h2>MOVES</h2>
                        {moves?.map(move => <p key={move}>{move}</p>)}
                        ...
                    </div>
                </article>
            )}

        </>
    )
}
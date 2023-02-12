import React from 'react'
import './pokemonBasicStats.scss'

interface PokemonBasicStatsProps {
    id: number,
    maxCp: number,
    maxHp: number,
}

export const PokemonBasicStats: React.FC<PokemonBasicStatsProps> = ({
    id,
    maxCp,
    maxHp
}) => (
    <div className='PokemonBasicStats'>
        <b className='PokemonBasicStats__id'>#{id}</b>
        <span className='PokemonBasicStats__stat--label'>
            Max hp
            <b className='PokemonBasicStats__stat PokemonBasicStats__stat--hp'>
                {maxHp}
                <span>HP</span>
            </b>
        </span>
        <span className='PokemonBasicStats__stat--label'>
            Max cp
            <b className='PokemonBasicStats__stat PokemonBasicStats__stat--cp'>
                <span>CP</span>
                {maxCp}
            </b>
        </span>
    </div>
)
export interface PokemonItemResponse {
    name: string,
    url: string

}

export interface PokemonsResponse {
    count: number,
    next: string,
    /* previous: null, */
    results: Array<PokemonItemResponse>
}

interface Ability {
    ability: {
        name: string,
        url: string
    },
    is_hidden: boolean,
    slot: number
}

interface PokemonType {
    type: {
        name: string,
        url: string
    }
}

export interface PokemonInfo {
    abilities: Array<Ability>,
    height: number,
    id: number,
    name: string,
    sprites: {
        other: {
            ["official-artwork"]: {
                front_default: string
            }
        }
    }
    types: Array<PokemonType>
}
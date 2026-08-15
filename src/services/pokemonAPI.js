const BASE_URL= 'https://pokeapi.co/api/v2'

export async function getPokemon(id) {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`)

    if(!response.ok){
        throw new Error("Failed to fetch the pokemon");

    }
    return response.json()

}


export async function getPokemonList(limit, offset) {
    
    const response= await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
    if(!response.ok){
        throw new Error("Failed to fetch the pokemon list")
    }
    return response.json()
}


export async function getPokemonByURL(url) {
    const response= await fetch(url)

    if(!response.ok){
        throw new Error("unable to fetch the url")
    }
    return response.json()
}

export async function getPokemonSpecies(id){
    const response = await fetch(`${BASE_URL}/pokemon-species/${id}`)

    if(!response.ok){
        throw new Error("Failed to fethc the pokemon speices")

    }
    return response.json()
}


export async function getEvolutionChain(url) {
    

    const response = await fetch(url)

    if(!response.ok){
        throw new Error("Failed to fetch evolution chain")
    }

    return response.json()
}
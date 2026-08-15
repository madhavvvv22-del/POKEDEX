import React from 'react'
import { getPokemonID } from '../utils/pokemonUtils'
import { Link } from 'react-router-dom'
import { pokemonTypeColors } from '../utils/pokemonTypes'   


const PokemonCard = ({pokemon}) => {

    const id= String(pokemon.id)

    const imageURL= `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

    const primaryType= pokemon?.types?.[0]?.type?.name || 'normal'
    const theme= pokemonTypeColors[primaryType]

  return (
    <Link to={`/pokemon/${id}`}>
    <div className={`rounded-2xl ${theme.bg} p-4 shadow-md transition duration-300 hover:scale-110`}>
        <p className='text-sm text-black font-bold '
        >#{id.padStart(4,'0')}</p>

        <img
        className='mx-auto h-40 w-40 object-contain '
         src={imageURL} 
        alt={pokemon.name} />

        <h2
        className={`text-center text-xl font-bold capitalize ${theme.text}`}
        >{pokemon.name}</h2>

    </div>
    </Link>
  )
}

export default PokemonCard
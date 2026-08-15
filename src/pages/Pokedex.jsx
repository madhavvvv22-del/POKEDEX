import React, {useEffect, useState, useRef} from 'react'
import { getPokemonList,getPokemonByURL } from '../services/pokemonAPI'
import PokemonCard from '../components/PokemonCard'
import PokedexHeader from '../components/PokedexHeader'



const Pokedex = () => {

    const TOTAL_POKEMON=1025
    const PAGE_SIZE=50
  
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore]= useState(true)


  const fetchedOffsets = useRef(new Set())

  useEffect(() => {

     if (fetchedOffsets.current.has(offset)) {
    return
        }
    fetchedOffsets.current.add(offset)

    async function fetchPokemonList() {
        try{
            const remainingPokemon= TOTAL_POKEMON-offset
            const limit=Math.min(PAGE_SIZE, remainingPokemon)
            const data = await getPokemonList(limit, offset)
            setHasMore(offset+limit<TOTAL_POKEMON)
            const detailedPokemonList= await Promise.all(
                data.results.map((pokemon)=>getPokemonByURL(pokemon.url))
            )
            setPokemonList(prev=> [...prev, ...detailedPokemonList])
        }catch(error){
            setError(error.message)
        }
        finally{
            setLoading(false)
        }
    }
        fetchPokemonList()
  }, [offset])


 const filteredPokemon = pokemonList.filter((pokemon) => {
    const searchValue = search.toLowerCase()

    return (
        pokemon.name.toLowerCase().includes(searchValue) ||
        String(pokemon.id).includes(searchValue)
    )
})


  if(loading){
    return <div>Loading Pokemon...</div>
  }
  if(error){
    return <div>{error}</div>
  }

  
    return (
    <div className='min-h-screen bg-black px-6 py-10'>
        
        <PokedexHeader
        search={search}
        setSearch={setSearch}
        />
        
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-4 lg-grid-cols-4'>
            {filteredPokemon.map((pokemon)=>{
                return (
                    <PokemonCard
                    key={pokemon.name}
                    pokemon={pokemon}
                    />
                )
            })}
        </div>



            {hasMore && (<div className='mt-10 flex justify-center'>
                <button
                onClick={()=>setOffset(prev=>prev+PAGE_SIZE)}
                className='rounded-2xl bg-white px-8 py-3 font-bold shadow-md transition hover:bg-gray-200'>
                    Load More
                </button>
            </div>)}
            

    </div>
  )
}

export default Pokedex
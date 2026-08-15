import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPokemon, getPokemonSpecies,getEvolutionChain } from '../services/pokemonAPI'
import { getUtilEvolutionChain } from '../utils/evolutionUtils'
import { pokemonTypeColors } from '../utils/pokemonTypes'

const PokemonDetails = () => {

    const { id }=useParams()
    const pokemondId = Number(id)
    
    const previousId= pokemondId-1
    const nextId= pokemondId+1



    const [pokemon, setPokemon] = useState(null)
    const [species, setSpecies] = useState(null)
    const [evolutions, setEvolutions] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const primaryType= pokemon?.types?.[0]?.type?.name ||'normal'
    const theme=pokemonTypeColors[primaryType]
    

    useEffect(()=>{
        async function fetchPokemon(){
            try{
                const pokemonData=await getPokemon(id)
                const speciesData= await getPokemonSpecies(id)
                const evolutionData= await getEvolutionChain(speciesData.evolution_chain.url)
                const evolutionNames= getUtilEvolutionChain(evolutionData.chain)
                setPokemon(pokemonData)
                setSpecies(speciesData)
                
                const evolutionDataList=await Promise.all(evolutionNames.map((name)=>{
                 return getPokemon(name)
                }))
                //setEvolutionChain(evolutionData)
                setEvolutions(evolutionDataList)
            }catch(error){
                setError(error.message)
            }finally{
                setLoading(false)
            }
        }
        fetchPokemon()
    }, [id])

    if(loading){
        return <div>Loading Pokemon...</div>
    }
    if(error){
        return <div>{error}</div>
    }




return (
    <div className={`flex h-screen flex-col overflow-hidden ${theme.bg} p-4`}>

        {/* Navigation */}
<div className="flex shrink-0 items-center justify-between pb-2">

    {/* Home */}
    <Link
        to="/pokedex"
        className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-bold transition hover:bg-gray-300"
    >
        🏠 Home
    </Link>

    {/* Previous / Next */}
    <div className="flex gap-3">

        {previousId >= 1 ? (
            <Link
                to={`/pokemon/${previousId}`}
                className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-bold transition hover:bg-gray-300"
            >
                ← Previous
            </Link>
        ) : (
            <div />
        )}

        {nextId <= 1025 ? (
            <Link
                to={`/pokemon/${nextId}`}
                className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-bold transition hover:bg-gray-300"
            >
                Next →
            </Link>
        ) : (
            <div />
        )}

    </div>

</div>

        {/* Main Content */}
        <div className="grid min-h-0 flex-1 gap-4 md:grid-cols-2">

            {/* LEFT — Pokemon */}
            <div className="flex min-h-0 flex-col rounded-3xl bg-white p-4 shadow-lg">

                <p className="text-sm font-semibold text-gray-400">
                    #{String(pokemon.id).padStart(4, '0')}
                </p>

                <div className="flex flex-1 flex-col items-center justify-center">

                    <img
                        src={
                            pokemon.sprites.other[
                                'official-artwork'
                            ].front_default
                        }
                        alt={pokemon.name}
                        className="h-48 w-48 object-contain transition duration-300 hover:scale-110"
                    />

                    <h1 className="mt-2 text-4xl font-extrabold capitalize">
                        {pokemon.name}
                    </h1>

                    <div className="mt-3 flex gap-2">

                        {pokemon.types.map((typeInfo) => (
                            <span
                                key={typeInfo.type.name}
                                className={`rounded-full ${theme.bg} ${theme.text}  bg-gray-200 px-5 py-2 text-sm font-bold capitalize`}
                            >
                                {typeInfo.type.name}
                            </span>
                        ))}

                    </div>

                </div>

            </div>


            {/* RIGHT — Information */}
            <div className="flex min-h-0 flex-col rounded-3xl bg-white p-4 shadow-lg">

                {/* About */}
                <div>

                    <h2 className="mb-3 text-2xl font-bold">
                        About
                    </h2>

                    <div className="grid grid-cols-3 gap-3">

                        <div className="rounded-2xl bg-gray-100 p-3 text-center">
                            <p className="text-xs font-semibold text-gray-500">
                                Height
                            </p>

                            <p className="mt-1 text-lg font-bold">
                                {pokemon.height}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-gray-100 p-3 text-center">
                            <p className="text-xs font-semibold text-gray-500">
                                Weight
                            </p>

                            <p className="mt-1 text-lg font-bold">
                                {pokemon.weight}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-gray-100 p-3 text-center">
                            <p className="text-xs font-semibold text-gray-500">
                                Base XP
                            </p>

                            <p className="mt-1 text-lg font-bold">
                                {pokemon.base_experience}
                            </p>
                        </div>

                    </div>

                </div>


                {/* Description */}
                <div className="mt-4">
                    <p className="leading-6 text-gray-600">
                        {species?.flavor_text_entries.find(
                            (entry) => entry.language.name === 'en'
                        )?.flavor_text}
                    </p>
                </div>


                {/* Abilities */}
                <div className="mt-4">

                    <h2 className="mb-2 text-xl font-bold">
                        Abilities
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {pokemon.abilities.map((abilityInfo) => (
                            <span
                                key={abilityInfo.ability.name}
                                className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold capitalize"
                            >
                                {abilityInfo.ability.name.replace("-", " ")}
                            </span>
                        ))}

                    </div>

                </div>


                {/* Base Stats */}
                <div className="mt-4">

                    <h2 className="mb-3 text-xl font-bold">
                        Base Stats
                    </h2>

                    {pokemon.stats.map((statInfo) => (

                        <div
                            className="mb-2"
                            key={statInfo.stat.name}
                        >

                            <div className="mb-1 flex justify-between">

                                <span className="text-sm font-medium capitalize">
                                    {statInfo.stat.name.replace("-", " ")}
                                </span>

                                <span className="text-sm font-bold">
                                    {statInfo.base_stat}
                                </span>

                            </div>

                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">

                                <div
                                    className={`h-full rounded-full ${theme.bar} transition-all duration-500`}
                                    style={{
                                        width: `${(statInfo.base_stat / 255) * 100}%`
                                    }}
                                />

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>


        {/* Evolution Chain */}
        <div className="mt-3 shrink-0 rounded-3xl bg-white p-3 shadow-lg">

            <h2 className="mb-2 text-center text-lg font-bold">
                Evolution Chain
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-2">

                {evolutions.map((evolution, index) => (

                    <React.Fragment key={evolution.id}>

                        <Link
                            to={`/pokemon/${evolution.id}`}
                            className="group rounded-2xl p-2 text-center transition duration-300 hover:-translate-y-1 hover:bg-gray-100"
                        >

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">

                                <img
                                    src={
                                        evolution.sprites.other[
                                            'official-artwork'
                                        ].front_default
                                    }
                                    alt={evolution.name}
                                    className="h-14 w-14 object-contain transition duration-300 group-hover:scale-110"
                                />

                            </div>

                            <p className="mt-1 text-sm font-semibold capitalize">
                                {evolution.name}
                            </p>

                            <p className="text-xs text-gray-400">
                                #{String(evolution.id).padStart(4, '0')}
                            </p>

                        </Link>


                        {/* Arrow */}
                        {index < evolutions.length - 1 && (
                            <span className="text-xl font-bold text-gray-400">
                                →
                            </span>
                        )}

                    </React.Fragment>

                ))}

            </div>

        </div>

    </div>
)
}

export default PokemonDetails
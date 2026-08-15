import React from 'react'

const PokedexHeader = ({search, setSearch}) => {
  return (
    <header className='mb-8'>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-5xl font-extrabold tracking-tight text-white'>
            Pokédex
            </h1>  
        </div>
        <input type="text"
        placeholder='Search by name or Pokédex number...'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='w-full rounded-2xl bg-white px-5 py-4 text-gray-900 outline-none transition focus:ring-2 focus:ring-gray-400 '
         />
    </header>
  )
}

export default PokedexHeader
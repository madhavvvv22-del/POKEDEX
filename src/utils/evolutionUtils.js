

export function getUtilEvolutionChain(chain){

    const evolutions=[]

    let current = chain

    while(current){
        evolutions.push(current.species.name)

        if(current.evolves_to.length>0){
            current =current.evolves_to[0]
        }else{
            current = null
        }
    }
    return evolutions
}
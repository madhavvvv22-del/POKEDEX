export function getPokemonID(url){
    const parts= url.split('/').filter(Boolean)
    return parts[parts.length-1]
}
// deno-lint-ignore-file


``
import { Character } from "./type.ts"

//https://rickandmortyapi.com/api/character

export const getCharacters=async(page:number=1):Promise<{results: Character[], info:any}>=>{
    const res= await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)

    if(!res.ok) throw new Response("error al hacer fetch de la pagina")

    const data= await res.json()
    return data
        
    
}

export const getCharactersId=async(id:string):Promise<Character>=>{
    const res= await fetch(`https://rickandmortyapi.com/api/character/${id}`)

    if(!res.ok) throw new Response("error al hacer fetch de la pagina")
    const data= await res.json()
    return data


}

export const searchCharacters= async(
    name:string, 
    page:number=1,
):Promise<{results: Character[], info:any}>=>{
    const res= await fetch(`https://rickandmortyapi.com/api/character?name=${name}&page=${page}`)

    if(!res.ok) throw new Response("error al hacer fetch de la pagina")

    const data= await res.json()
    return data
}
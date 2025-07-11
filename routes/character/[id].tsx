import { FreshContext, Handlers,PageProps } from "$fresh/server.ts";
import {  getCharactersId } from "../../utils/API.ts";
import { Character } from "../../utils/type.ts";



interface PageData{
  character: Character|null,
  error?:string
}

export const handler: Handlers<PageData>={
    async GET(req: Request, ctx: FreshContext) {
    
    const {id}=ctx.params

    try{
        const character= await getCharactersId(id)
        return ctx.render({character})

    }catch{

        return ctx.render({
            character:null,
            error:"El personaje no existe"
        }
        )

    }
    
    }



}



export default function CharacterDetail({data}:PageProps<PageData>){
    const {character, error}= data

    if(error||!character){
        return(
            <div class="container">
                <div class="no encontrado">
                    <a href="/">Volver a personajes</a>
                    <h1> NO EXISTE EL PERSONAJE</h1>
                     </div>

            </div>
        )
    }


    return(
        <div class="container">
            <a href="/">Volver a personajes</a>

            <div class="character-detail">
                <div class ="character-image">
                    <img src={character.image} alt={character.name}></img>
                </div>
                <div class="character-info">
                <h1>{character.name}</h1>

                <ul>
                    <li>
                        <strong>Status:</strong>{character.status}
                    </li>
                    <li>
                        <strong>Species:</strong>{character.species}
                    </li>
                    <li>
                        <strong>Gender:</strong>{character.gender}
                    </li>
                    <li>
                        <strong>Origin:</strong>{character.origin.name}
                    </li>
                    <li>
                        <strong>Location:</strong>{character.location.name}
                    </li>

                </ul>

                </div>
            </div>

        </div>
    )

}

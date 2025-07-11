import { Character } from "../utils/type.ts";


interface CharacterCardProps{
    character:Character
}
export  default function CharacterCard({character}:CharacterCardProps){
    return(
        <a href={`/character/${character.id}`}class="character-card">


            <div class="character-image">

                <img src={character.image} alt= {character.name}
                ></img>





            </div>

            <div class= "character-content">
                <h3 class="character-name">{character.name}</h3>
            </div>





        </a>
    )

}
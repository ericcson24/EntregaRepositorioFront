import { FreshContext, Handlers,PageProps } from "$fresh/server.ts";


import { getCharacters, searchCharacters } from "../utils/API.ts";
import { Character } from "../utils/type.ts";

import Pagination from "../islands/Pagination.tsx";
import CharacterCard from "../components/CharacterCard.tsx";

import SearchForm from "../islands/SearchForm.tsx";

interface PageData{
  characters: Character[],
  info:any,
  page:number,
  search:string,
  error?:string


}


export const handler: Handlers<PageData> = {
  async GET(req: Request, ctx: FreshContext) {
    const url= new URL(req.url)

    const page= parseInt(url.searchParams.get("page")||"1")


    const search= url.searchParams.get("search")||""

    try{
      let data
      if(search)
      { 
          data = await searchCharacters(search,page)
      }else{
        data= await getCharacters(page)
      }

      return ctx.render({
        characters: data.results || [],
        info: data.info || { pages: 0 },
        page,
        search,
        }
      )

    }catch (error){
      return ctx.render({
        characters: [],
        info:  { pages: 0 },
        page,
        search,
        error: "error en carga de personajes"
        }
      )
    }

  }
};

export default function Home({ data }: PageProps<PageData>) {
    const { characters, info, page, search, error } = data;

    return (
        <div class="container">
            <div class="header">
                <h1 class="title">Rick and Morty Characters</h1>
                <p class="subtitle">Realizado por eric kowalski</p>
            </div>

            <SearchForm initialSearch={search} />

            {error && (
                <div class="error-message">
                    {error}
                </div>
            )}

            {search && (
                <div class="search-results">
                    <p>
                        {characters.length > 0
                            ? `encontrados ${characters.length} resultados para "${search}"`
                            : `No hay resultados con "${search}"`}
                    </p>
                </div>
            )}

            {characters.length > 0
                ? (
                    <>
                        <div class="characters-grid">
                            {characters.map((character) => (
                                <CharacterCard
                                    key={character.id}
                                    character={character}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={page}
                            totalPages={info.pages}
                            search={search}
                        />
                    </>
                )
                : !error && (
                    <div class="no-results">
                        <h3>no hay personajes con ese nombre</h3>
                        
                    </div>
                )}
        </div>
    );
}

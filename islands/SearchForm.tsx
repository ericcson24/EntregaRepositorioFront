import { useState } from "preact/hooks";

 interface SearchFormProps{
    initialSearch:string
 }

 export default function SearchForm({initialSearch}:SearchFormProps){
    const [search,setSearch]=useState(initialSearch)

    const handleSubmit=async(e:Event)=>{
        e.preventDefault()
        const url=search ? `/?search=${encodeURIComponent(search)}`:"/"
        window.location.href=url
    }

    const handlerClear=()=>{
        setSearch("");
        window.location.href="/"
    }

    return(
        <form onSubmit={handleSubmit} class="search-form">
            <input
                class="search-input"
                type = "text"
                placeholder="nombre dle personaje"
                value={search}
                onInput={(e)=>setSearch((e.target as HTMLInputElement).value)}

            >  </input>
                <button class="button" type="submit"> Buscar</button>
                {search&&(
                    <button class="button-secundary" type="button" onClick={handlerClear}> Quitar

                    </button>
                )}

           



        </form>
    )


 }
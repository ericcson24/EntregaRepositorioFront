interface PaginationProps{
    currentPage:number,
    totalPages:number,
    search:string
}

export default function Pagination({currentPage,totalPages,search}:PaginationProps){

const createUrl=(page:number)=>{
    const params= new URLSearchParams()
    params.set ("page",page.toString())
    if (search){
        params.set("page",search)
    }
    return `/?${params.toString()}`
}

const hasPrevious= currentPage>1
const hasnext = currentPage<totalPages

return(
    <div class="pagination">
    {
        hasPrevious &&
        <a href={createUrl(currentPage-1)} class= "button">
            Anterior
        </a>
        
    }
    <span>
        {currentPage} / {totalPages}
    </span>

    {
        hasnext &&
        <a href={createUrl(currentPage+1)} class= "button">
            Siguiente
        </a>
        
    }


    </div>
)




}
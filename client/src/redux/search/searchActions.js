
export const addParams = (keyword, pageNumber,sortBy,searchByCat,searchByBrand)=>dispatch=>{
    return dispatch({type:'params',payload:{
        keyword,
        pageNumber,
        sortBy,
        searchByCat,
        searchByBrand
    }})
}
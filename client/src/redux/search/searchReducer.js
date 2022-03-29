const initialState= {
    searchByBrand:'',
    keyword:'',
    searchByCat:'',
    sortBy:'',
    pageNumber:1
}
const searchReducer = (state = initialState,action) => { 
    switch(action.type){
        case 'params':
            return {...state,...action.payload}
        default:
            return state
    }
 }
 export default searchReducer
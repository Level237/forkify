import Search from "./models/search";

/**Global state of the app
 * --Search object
 * --Current recipe Object
 * -- Shopping list object
 * --Liked recipes
 */
const state={};

const controllSearch=async ()=>{
    //1) Get Query from view 
    const query='pizza';// TODO

    if(query){
        //2) New Search object and add to state
        state.search=new Search(query)

        //3) Prepare U for resultq

        // 4) Search for recipes
        await state.search.getResults();

        //5) Render results on UI
        console.log(state.search.result);
    }
}
document.querySelector('.search').addEventListener('submit',e=>{
    e.preventDefault();
    controllSearch();
})
const search= new Search('pizza');
console.log(search);
search.getResults();
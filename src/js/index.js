import Search from "./models/search";
import * as searchView from './views/searchView'
import { clearloader, elements,renderLoader } from "./views/base";
/**Global state of the app
 * --Search object
 * --Current recipe Object
 * -- Shopping list object
 * --Liked recipes
 */
const state={};

const controllSearch=async ()=>{
    //1) Get Query from view 
    const query=searchView.getInput();    ;// TODO

    if(query){
        //2) New Search object and add to state
        state.search=new Search(query)

        //3) Prepare U for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)
        // 4) Search for recipes
        await state.search.getResults();

        //5) Render results on UI
        clearloader();
        searchView.renderResult(state.search.results);
    }
}
elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    controllSearch();
})
const search= new Search('pizza');
console.log(search);
search.getResults();
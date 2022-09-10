import Search from "./models/search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { clearloader, elements,renderLoader } from "./views/base";
/**Global state of the app
 * --Search object
 * --Current recipe Object
 * -- Shopping list object
 * --Liked recipes
 */
const state={};


/*****
 * Search Controller
 */
const controllSearch=async ()=>{
    //1) Get Query from view 
    const query=searchView.getInput();    ;// TODO
    if(query){


        //2) New Search object and add to state
        state.search=new Search(query)

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)

        try {
            // 4) Search for recipes
        await state.search.getResults();

        //5) Render results on UI
        clearloader();
        searchView.renderResult(state.search.results);
        } catch (error) {
            alert('Something wrong with the search...')
            clearloader();
        }
        
    }
}
elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    controllSearch();
})

elements.searchResPages.addEventListener('click',e=>{

    const btn=e.target.closest('.btn-inline ');
    if(btn){
        const goToPage=parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResult(state.search.results,goToPage)
        console.log(goToPage);
    }
})



/******
 * 
 * Recipe Controller
 */

const controlRecipe= async()=>{
    const id=window.location.hash.replace('#','');
    console.log(id);

    if(id){


        
            //Prepare UI for changes
            recipeView.clearRecipe();
            renderLoader(elements.recipe);

            //Hightlight selected search item
            if(state.search) searchView.hightlightSelected(id);
        // Create new recipe object

        state.recipe=new Recipe(id);

        try{
        // Get recipe data
        await state.recipe.getRecipe();
        
        state.recipe.parseIngredients();
        //calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // render recipe
        clearloader();
        recipeView.renderRecipe(state.recipe);
        }catch(error){
            console.log(error);
        }
        
    }
}
//window.addEventListener('hashchange',controlRecipe);
//window.addEventListener('load',controlRecipe);

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));

//Handling recipe button clicks;
elements.recipe.addEventListener('click',e=>{
    if(e.target.matches('.btn-decrease,.btn-decrease *')){
        // Decrease button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe)
        }
        
    }else if(e.target.matches('.btn-increase,.btn-increase *')){
        //increase button is clicked
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredients(state.recipe)
    }
    console.log(state.recipe);
});


//List Controllers


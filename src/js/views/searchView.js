import { elements } from "./base"

export const getInput=()=>  elements.searchInput.value;
export const clearInput=()=>{elements.searchInput.value='';}

export const clearResults=()=>{
    elements.searchResList.innerHTML='';
    elements.searchResPages.innerHTML='';
}

const limiRecipeTitle=(title,limit=17)=>{
    const newTitle=[];
    if(title.length > limit){
        title.split(' ').reduce((acc,curr)=>{
            if(acc + curr.length <=limit){
                newTitle.push(curr);
            }
            return acc + curr.length;
        },0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
}
const renderRecipe=recipe=>{
    const markup=`
    <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limiRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);
}

//type :'prev' or 'next'
const createButton=(page,type)=> `
<button class="btn-inline results__btn--${type}" data-goto=${type==='prev' ? page - 1 : page +1}>
<span>Page ${type==='prev' ? page - 1 : page +1}</span>
<svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left' : 'right'}"></use>
    </svg>
    
</button>

`

const renderButtons=(page,numResult,resPerPage)=>{

    const pages=Math.ceil(numResult/resPerPage);
    console.log(pages);

    let button;
    if(page===1 && pages >1){
        //Only button to go to next page
        button=createButton(page,'next');
        
    }else if(page===pages  && pages >1){
        //Only button to go to Previous page
        button=createButton(page,'prev')
    }
    else if(page<pages){
        // Both buttons
        button=`
        ${createButton(page,'next')}
        ${createButton(page,'prev')}
        `;

        
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin',button);

};
export const renderResult=(recipes,page=1,resPerPage=10)=>{
    
    // render results of current page
    const start=(page - 1) * resPerPage;
    const end=page*resPerPage;

    recipes.slice(start,end).forEach(renderRecipe)

    //render pagination

    renderButtons(page,recipes.length,resPerPage);
}
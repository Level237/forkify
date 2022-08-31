import axios from 'axios';

//https://forkify-api.herokuapp.com/api/search

async function getResult(query){
    
    
    try{
        const res=await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        const recipes=res.data.recipes;
        console.log(recipes);
    }catch(error){
        alert(error);
    }
    
}
getResult('carrot');
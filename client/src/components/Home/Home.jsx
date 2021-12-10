import React, {useState} from 'react'
import SearchBar from '../SearchBar/SearchBar';
import {useDispatch, useSelector} from 'react-redux'
import { getAllRecipes, filterByScore, filterByDietTypes, filterByOrderAlphabetical } from '../../actions';
import Paged from '../Paged/Paged';
import Cards from '../Cards/Cards';
import Loading from '../Loading/Loading';
import style from "./home.module.css";


function Home() {

    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const lasIndexRecipe = currentPage * recipesPerPage;
    const firstIndexRecipe = lasIndexRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(firstIndexRecipe, lasIndexRecipe);
    
    const [, setOrderAlph] = useState("");
    const [, setOrderScore] = useState("");


    console.log(currentRecipes)
    
    
    const Page = pageNumber => {
        setCurrentPage(pageNumber);
    };



    
    const filterScore = event => {
        event.preventDefault();
        dispatch(filterByScore(event.target.value));
        setCurrentPage(1);
        setOrderScore(`${event.target.value}`);
    };

    const filterOrderAlphabetical = event => {
        event.preventDefault();
        dispatch(filterByOrderAlphabetical(event.target.value));
        setCurrentPage(1);
        setOrderAlph("Order" + event.target.value);
    };


    const filterDiets = event => {
        dispatch(filterByDietTypes(event.target.value));
    };

    // const filterCreated = event => {
    //     event.preventDefault();
    //     dispatch(filterByCreation());
    //     setCurrentPage(1);
    // };

    

    function handleReloadRecipes(e) {
        e.preventDefault();
        dispatch(getAllRecipes());
        console.log("despachado");
    }

    const timeout = setTimeout(() => <Loading/>, 2000)

    return (
            <div className={style.home_container}>
                <SearchBar/>
            <div>
            

             {/* -----------------------  filtros -------------------------- */}
            <div className={style.filtersHome}>
                <select onChange={ e => filterScore(e) } className={style.homeselect}>
                    <option value="none" id="selectScore" defaultValue>
                        Filter by score
                    </option>
                <option value="desc"> High score </option>
                <option value="asc"> Low score </option>
            </select>


                <select onChange={ e => filterOrderAlphabetical(e) } className={style.homeselect}>
                    <option defaultValue value="-">Filter Alphabetically</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>


                <select onChange={(e) => filterDiets(e)}  className={style.homeselect}>
                    <option value="none" id="selectDiet" defaultValue>
                    Filter by diet
                    </option>
                    <option value="All"> All diets</option>
                    <option value="gluten free"> Gluten free</option>
                    <option value="dairy free"> Dairy free</option>
                    <option value="vegetarian"> Vegetarian</option>
                    <option value="paleolithic"> Paleolithic</option>
                    <option value="lacto ovo vegetarian"> Lacto ovo vegetarian</option>
                    <option value="vegan"> Vegan</option>
                    <option value="pescatarian"> Pescatarian</option>
                    <option value="primal"> Primal</option>
                    <option value="fodmap friendly"> Fodmap friendly</option>
                    <option value="whole 30"> Whole 30</option>
                </select>


                <button onClick={(e) => handleReloadRecipes(e)} className={style.reloadRecipes}>Reload recipes  <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_438061.png&f=1&nofb=1" className={style.reloadBtn} alt="" width="25" height="20"/></button>


            </div>
             {/* ----------------------- Fin de filtros -------------------------- */}



             <div className={style.home_cardflexcontainer}>
            {currentRecipes.length 
            ?
            timeout &&
            currentRecipes.map(recipe => (
                <div>
                    <Cards className={style.home_cardflexcontainer}
                    key = {recipe.id}
                    name = {recipe.name}
                    image = {recipe.image}
                    dietType = { recipe.diets ? recipe.diets : recipe.dietTypes && recipe.dietTypes.map((e) => e.name)}
                    created = {recipe.createdInDB}
                    id = {recipe.id} />
                </div>
            ))
            :
            <Loading/>
            
        }
        </div>


        <Paged
        recipesPerPage={ recipesPerPage }
        recipesLength= { recipes.length }
        Page = { Page } />

            </div>
        </div>
    )
}

export default Home

import React from 'react';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import { Link } from "react-router-dom";
import { getRecipesByName } from "../../actions/index";
import style from './SearchBar.module.css'


function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState({ name: " " });

  //agarra el nombre del input y lo setea en el estado
  function handleName(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }


  //on submit-->Le mando lo que esta en el estado
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipesByName(name));

    setName(" ");
    document.getElementById("Find").reset();
  }


    return (
        <nav>
        <div className={style.sb_nav}>
          <form id='Find' className={style.Find}>
            <div className={style.sb_searchcontainer}>
              <input
                type="text"
                placeholder="Search your Tasty"
                onChange={(e) => handleName(e)}
                className={style.inputSearch} 
                autoComplete="on"
              />
              <button id={style.sb_send} type="submit" onClick={(e) => handleSubmit(e)} className={style.submitBtn} >
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpluspng.com%2Fimg-png%2Fsearch-button-png-search-icon-this-icon-is-supposed-to-represent-a-magnifying-glass-it-s-a-large-png-50-px-1600.png&f=1&nofb=1" alt="img not found" width="20" height="20" />
              </button>
            </div>
          </form>
  

  
          <Link to="/recipe" className={style.createRecipe}>
            <span >Create New Recipe</span>
          </Link>
        </div>
      </nav>

    )
}

export default SearchBar

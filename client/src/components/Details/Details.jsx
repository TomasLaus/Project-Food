import React, { useEffect } from 'react';
import {useParams} from 'react-router';
import {getRecipeDetail} from '../../actions/index';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink } from "react-router-dom";
import style from "./details.module.css";
import Loading from '../Loading/Loading';

function Details() {

    const dispatch = useDispatch();
    let recipe = useSelector(state => state.detail);

    
    const {id} = useParams();

    useEffect(() => {
        dispatch(getRecipeDetail(id))
    }, [dispatch, id])


    console.log(recipe);

    return (
        <div className={style.detail_form}>
        {   recipe.length >= 1
            ?   
            <div className={style.detail_container}>
                
                <h2 className={style.detail_title}>{recipe[0].name}.</h2>
                <NavLink to="/home" className={style.detail_link} activeClassName={style.detail_link_a}>⬅</NavLink>
                <hr/>
                <h4 className={style.detail_score}> Score: {recipe[0].score} points. </h4> <br/>
                <h4 className={style.detail_health}> Healthiness: {recipe[0].healthyScore} points. </h4>
                <hr/>
                <img height="300px" alt="imag-det" src={ recipe[0].image ? recipe[0].image : 'notfound' } className={style.detail_img}/>
                {
                    <div >
                        <label>Diet-types:</label>
                        {
                            recipe[0].createdInDB
                            ? 
                            <p className={style.recipesDetail}>{recipe[0].diets.map(diet => diet.name).join(', ')}</p>
                            : 
                            <p className={style.recipesDetail}>{recipe[0].diets.map(diet => diet).join(', ') }</p>
                        }
                    </div>
                }
                <hr/>
                <p className={style.detail_resume}> Summary: {recipe[0].summary.replace(/<[^>]*>?/g, '')}. </p>
                <hr/>
                <p className={style.detail_sbs}> Step by step: {recipe[0].steps ? recipe[0].steps : " No step-by-step specified for this recipe, sorry..."}. </p> 
            </div>
            :
            <div>
                <Loading/>

            </div>
        }
    </div>
    )
}

export default Details

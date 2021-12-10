import axios from 'axios';
import {GET_RECIPES,
     GET_RECIPES_BY_NAME,
     GET_DIET_TYPES,
     GET_RECIPE_DETAIL,
     FILTER_BY_SCORE,
     FILTER_BY_ORDER_ALPHABETICAL,
     FILTER_BY_DIET_TYPES,
     FILTER_BY_CREATION,
} from './constants';

export const getAllRecipes =()=> {

    return async function(dispatch) {
        const response = await axios.get("http://localhost:3001/recipes");

        return dispatch({
            type: GET_RECIPES,
            payload: response.data
        });
    };
};

export function getRecipesByName(name) {
    return async function(dispatch) {
        try {
            const recipes = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            return dispatch({type: GET_RECIPES_BY_NAME, payload: recipes.data});
        } catch (error) {
            console.error(error);
        }
    }
};

export const getDietTypes =()=> {

    return async function (dispatch) {
        const json = await axios("http://localhost:3001/types");
        return dispatch({
            type: GET_DIET_TYPES,
            payload: json.data
        });
    };
};


export const getRecipeDetail = payload => {

    return async function (dispatch) {
        try {
            const response = await axios(`http://localhost:3001/recipes/${payload}`);
            return dispatch({
                type: GET_RECIPE_DETAIL,
                payload: response.data
            });
        }
        catch (err) {
            console.log(err);
        };
    };
};

export async function postNewRecipe(payload) {
    try {
      await axios.post("http://localhost:3001/recipe", payload);
      return true;
    } catch ({ message: error }) {
      return false;
    }
}

export const filterByScore = payload => {

    return {
        type: FILTER_BY_SCORE,
        payload
    };
};

export const filterByOrderAlphabetical = payload => {

    return {
        type: FILTER_BY_ORDER_ALPHABETICAL,
        payload
    };
};

export const filterByDietTypes = payload => {

    return {
        type: FILTER_BY_DIET_TYPES,
        payload
    };
};

export const filterByCreation = payload => {

    return {
        type: FILTER_BY_CREATION,
        payload
    };
};
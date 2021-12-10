import {GET_RECIPES, 
    GET_RECIPES_BY_NAME,
    GET_DIET_TYPES,
    GET_RECIPE_DETAIL,
    FILTER_BY_SCORE,
    FILTER_BY_ORDER_ALPHABETICAL,
    FILTER_BY_DIET_TYPES,
    FILTER_BY_CREATION,
    POST_RECIPE} from '../actions/constants';

const initialState = {
    recipes: [],
    recipesTotal: [],
    dietTypes: [],
    detail: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES: 
            return {
                ...state,
                recipes: action.payload,
                recipesTotal: action.payload
            }; 
            case GET_RECIPES_BY_NAME: 
            return {
                ...state,
                recipes: action.payload
            };
            case GET_DIET_TYPES:
                return {
                    ...state,
                    dietTypes: action.payload
                };
            case GET_RECIPE_DETAIL:
                return {
                    ...state,
                    detail: action.payload
                };
                case POST_RECIPE:
                  return {
                    ...state,
                  };
            
            case FILTER_BY_SCORE:
                let recipesByScore =
                action.payload === "asc"
                  ? state.recipes.sort(function (a, b) {
                      return a.score - b.score;
                    })
                  : state.recipes.sort(function (a, b) {
                      return b.score - a.score;
                    });
        
              return {
                ...state,
                recipes: recipesByScore,
              };

            case FILTER_BY_ORDER_ALPHABETICAL:
                let sortedRecipes =
                  action.payload === "A-Z"
                    ? state.recipes.sort(function (a, b) {
                        if (a.title.toLowerCase() > b.title.toLowerCase()) {
                          return 1;
                        }
                        if (b.title.toLowerCase() > a.title.toLowerCase()) {
                          return -1;
                        }
                        return 0;
                      })
                    : state.recipes.sort(function (a, b) {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) {
                          return 1;
                        }
                        if (b.title.toLowerCase() < a.title.toLowerCase()) {
                          return -1;
                        }
                        return 0;
                      });
                return {
                  ...state,
                  recipes: action.payload === "default" ? state.recipes : sortedRecipes,
                };

            case FILTER_BY_DIET_TYPES:
                const allRecipes = state.recipesTotal;

                let dietsFiltered = action.payload === "All" 
                    ? state.recipesTotal 
                    : allRecipes.filter( el => el.diets.includes(action.payload)); 
                
                if (action.payload === "vegetarian") {
                  dietsFiltered = allRecipes.filter(recipe =>
                     recipe.vegetarian === true
                  )
                }
                return {
                  ...state,
                  recipes: dietsFiltered,
                };
                
            case FILTER_BY_CREATION:
                let filterByCreation;

                if (action.payload === 'existent') {
                    filterByCreation = state.recipes.filter(recipes => !recipes.createdInDB);
                }

                else if (action.payload === 'created') {
                    filterByCreation = state.recipes.filter(recipes => recipes.createdInDB);
                }

                else filterByCreation = state.recipes;

                return {
                    ...state,
                    recipes: filterByCreation
                };

        default: return state;
    }
};

export default rootReducer;
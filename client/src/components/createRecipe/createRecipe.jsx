import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDietTypes, postNewRecipe } from "../../actions/index";
import "./recipe.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "The name of recipe is required";
  } else if (!input.summary) {
    errors.summary = "Summary is required";
  } else if (input.score > 100) {
    errors.score = "The score has to be lower than 100";
  } else if (input.healthyScore > 100) {
    errors.healthyScore = "The healt has to be lower than 100";
  }
  if (!input.image.includes("https://") && !input.image.includes("http://")) {
    errors.image = "This isn't a valid image address";
  } else {
    errors.image = "";
  }
  return errors;
}

export default function RecipeCreate() {
  //Permite despachar al reducer
  const dispatch = useDispatch();
  //me redirecciona al home
  const history = useNavigate();

  //Me conecta al store
  const diets = useSelector((state) => state.dietTypes);
  

  //modelo estado.
  const obj = {
    name: "",
    summary: "",
    score: Number,
    healthyScore: Number,
    steps: "",
    image: "",
    diets: [],
  };

  //Estado
  const [input, setInput] = useState(obj);

  //Estado error
  const [errors, setError] = useState({});

  //Ante cada cambio-->despacha -->renderiza
  useEffect(() => {
    dispatch(getDietTypes());
  }, [dispatch]);

  //cambios en el input-->estado
  function handleChange(e) {
    const { name, value } = e.target;

    //Guarda en el estado
    setInput({
      ...input,
      [name]: value, // Sintaxis ES6 para actualizar la key correspondiente
    });

    //chequea errores
    setError(
      validate({
        ...input,
        [name]: value,
      })
    );
  }
  //cambios en el checkbox -->Estado
  function handleCheckBoxs(e) {
    if (e.target.checked === true) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.name],
      });
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((diet) => diet !== e.target.name),
      });
    }
  }

  //submmit
  async function handleSubmit(e) {
    e.preventDefault();
    const flag = await postNewRecipe(input);
    setInput(obj);

    flag === true
      ? alert("Recipe successfully created")
      : alert("hubo un error en la carga");
    history("/home");
  }

  //renderiza
  return (
    <div className="principal-on">
      <div className="home">
        <Link to="/home">
          <button className="post-gohome"> Home </button>
        </Link>
      </div>

      <h1>Create your recipe</h1>

      <div className="form-register">
        <form
          id="Creat"
          onChange={(e) => {
            handleChange(e);
          }}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label className="label_names" for="titleID">Title: </label>
          <input
            name="name"
            type="text"
            id="titleID"
            placeholder="New recipe"
            className="input_text"
            value={input.name}
            required
          />
          {errors.name && <p className="error"> {errors.name}</p>}

          <label className="label_names" for="summaryID">Summary: </label>
          <textarea
            name="summary"
            type="text"
            id="summaryID"
            placeholder="Summary"
            className="input_text"
            value={input.summary}
            required
          />
          {errors.summary && <p className="error"> {errors.summary}</p>}
          <label className="label_names">Steps: </label>
          <textarea
            name="steps"
            type="text"
            id="stepsID"
            placeholder="Your step by step"
            className="input_text"
            value={input.steps}
            required
          />
          {errors.steps && <p className="error"> {errors.steps}</p>}

          <label className="label_names">Score: </label>
          <input
            name="score"
            type="number"
            placeholder="Score"
            className="input_text"
            value={input.score}
            required
          />
          {errors.score && <p className="error"> {errors.score}</p>}

          <label className="label_names">Health: </label>
          <input
            name="healthyScore"
            type="number"
            placeholder="healthy Score"
            className="input_text"
            value={input.healthyScore}
            required
          />
          {errors.healthyScore && <p className="error"> {errors.healthyScore}</p>}
          <div>
            <label className="label_names" for="img">Image URL:</label>
            <input
              className="input_text"
              type="text"
              id="img"
              placeholder="Example: https://..."
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
              required
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <button type="submit" className="post-btncreate">
                Create Recipe
          </button>
          </form>
        </div>
          
          
        <div className="diets">
          <form
            onChange={(e) => {
              handleCheckBoxs(e);
            }}
            >
            <h3>Select diets </h3>
            {diets &&
              diets.map((diet) => {
                return (
                  <div className="diets_divmap">
                    <label className="label_diets"> {diet.name}</label>
                    <input className="input_check" type="checkbox" name={diet.name}/>
                  </div>
                );
                
              })}
          </form>
      </div>




    </div>


  );
}
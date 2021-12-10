
import { render, screen } from '@testing-library/react';
import rootReducer from "./reducer";
import store from './store/index';
import { Provider } from 'react-redux'
import {BrowserRouter } from 'react-router-dom'
import AddRecipe from './components/createRecipe/createRecipe'



test("should return initial state", () => {
  expect(rootReducer(undefined, {})).toEqual({
    recipes: [], // -->RENDERIZA
    recipesTotal: [], //Back up con toda la info.
    dietTypes: [], //TODAS LAS DIETAS
    detail: [], //Detalle id
  });
});

describe("AddRecipe", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddRecipe />
        </BrowserRouter>
      </Provider>
    );
  });
  it("Form must have an input text for Title /", () => {
    const element = screen.getByLabelText("Title:");
    expect(element.type).toBe("text");
  });
  it("Form must have an input text for Summary /", () => {
    const element = screen.getByLabelText("Summary:");
    expect(element.type).toBe("textarea");
  });
  it("Form must have an input string for Image URL /", () => {
    const element = screen.getByLabelText("Image:");
    expect(element.type).toBe("text");
  });
});
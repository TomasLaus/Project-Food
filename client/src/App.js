import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from '../src/components/Home/Home'
import Details from './components/Details/Details';
import Landing from './components/Landing/Landing';
import CreateRecipe from './components/createRecipe/createRecipe';

function App() {
  return (
    <div className="App"> 
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route exact path="/recipe" element={<CreateRecipe/>}/>
          <Route exact path="/recipes/:id" element={<Details/>} />
          <Route exact path='/home' element={<Home/>} />
        </Routes> 
    </div>
  );
}

export default App;

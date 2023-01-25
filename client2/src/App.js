import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import LandingPage from './components/LandingPage.jsx';
import CreateVideogame from './components/CreateVideogame';
import Detail from './components/Detail';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/" component = {LandingPage}/>
        <Route exact path = "/home" component = {Home} />
        <Route exact path = "/createVideogame" component={CreateVideogame}/>
        <Route exact path = "/videogames/:id" component = {Detail}/>
      </Switch>
    </div>
  );
}

export default App;

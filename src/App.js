import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './component/Header';
import Leftheader from './component/Leftheader';
import SeedPostContainer from './component/SeedPostContainer';
import Chat from './component/Chat';
import Login from './component/Login';
import Singup from './component/Singup';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

         {/* singup */}
          <Route path='/singup'>
            {/* <Header/> */}
            <Singup/>
          </Route>

         {/* login */}
          <Route path='/login'>
            <Header/>
            <Login/>
          </Route>

         {/* chat */}
          <Route path='/chat'>
            <Header/>
            <Chat/>
          </Route>

          {/* home */}
          <Route path='/'>
              <Header/>
              <Leftheader/><SeedPostContainer/>
              {/* <GoogleAutoComplete/> */}
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;

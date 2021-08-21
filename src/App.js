import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './component/Home'
import Header from './component/Header'
import Leftheader from "./component/Leftheader";
import Chat from './component/Chat';
import Login from './component/Login';
import Singup from './component/Singup';
import FullPost from './component/Post/FullPost'
import FormAnswer from "./component/form/FormAnswer";
import FormHome from "./component/form/FormHome";
function App() {

  return (
    <div className="App">
      <Router>
        <Switch>

          {/* Post */}
          <Route path='/post'>
            <FullPost />
          </Route>

          {/* singup */}
          <Route path='/singup'>
            <Singup />
          </Route>

          {/* login */}
          <Route path='/login'>
            <Login />
          </Route>

          {/* chat */}
          <Route path='/chat'>
            <Header/>
            <Chat />
          </Route>

          {/* Form */}
          <Route path='/form'>
            <Header/>
            <Leftheader />
            <FormHome />
          </Route>


          {/* Form Answer*/}
          <Route path='/formAnswer'>
            <Header/>
            <Leftheader />
            <FormAnswer />
          </Route>

          {/* home */}
          <Route path='/'>
            <Home />
            {/* <GoogleAutoComplete/> */}
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;

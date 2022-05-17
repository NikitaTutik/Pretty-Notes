import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import './App.css';
import Header from './components/Header'
import Login from './components/users/login'
import Register from './components/users/register'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import { loadUser } from './actions/auth'
import store from './store'
import { useEffect } from "react";
import { Provider } from 'react-redux'
import PrivateRoute from './components/common/PrivateRoute'




function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}> 
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Route exact path="/"  component={NotesListPage} />
          <Route path="/note/:id" component={NotePage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </div>
    </Router>
    </Provider>
  );
}

export default App;

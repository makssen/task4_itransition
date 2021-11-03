import { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import { Progress } from './components/Progress';
import { Context } from './context/ContextProvider';
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';

export const App = () => {

  const { isLoading, isAuth } = useContext(Context);

  return (
    <>
      {!isLoading ? <Progress /> :
        <BrowserRouter>
          <Navbar />
          <Switch>
            <PrivateRoute
              exact
              path="/messages"
              isAuth={isAuth}
              component={Chat}
            />
            <Route exact path="/" component={Login} />
            <Route path="*">
              404 not found
            </Route>
          </Switch>
        </BrowserRouter>
      }
    </>
  );
}


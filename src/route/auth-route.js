import useIsLoggedIn from 'hooks/use-is-logged-in';
import { Redirect, Route } from 'react-router-dom';
import redirectPaths from 'constants/redirect-paths';

const AuthRoute = ({ children, ...rest }) => {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Redirect to={redirectPaths.login} />;
  }

  return <Route {...rest}>{children}</Route>;
};

export default AuthRoute;

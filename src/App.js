import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import NotFoundPage from 'pages/not-found/not-found-page';
import LoginPage from 'pages/login/login-page';
import DashboardPage from 'pages/dashboard/dashboard-page';
import SettingsPage from 'pages/settings/settings-page';
import NavigationMenu from 'components/navigation-menu/navigation-menu';

const appRoutes = [
  {
    path: '/dashboard',
    component: DashboardPage,
  },
  {
    path: '/settings',
    component: SettingsPage,
  },
];

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Route path={appRoutes.map(({ path }) => path)}>
          <NavigationMenu />
        </Route>

        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>

          {appRoutes.map(({ path, component: Component }) => (
            <Route path={path}>
              <Component />
            </Route>
          ))}

          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ChakraProvider, HStack } from '@chakra-ui/react';
import NotFoundRoute from 'route/not-found/not-found-route';
import LoginRoute from 'route/login/login-route';
import DashboardRoute from 'route/dashboard/dashboard-route';
import SettingsRoute from 'route/settings/settings-route';
import NavigationMenu from 'components/navigation-menu/navigation-menu';
import AuthRoute from 'route/auth-route';
import NoAuthRoute from 'route/no-auth-route';
import { QueryClient, QueryClientProvider } from 'react-query';

const appRoutes = [
  {
    path: '/dashboard',
    component: DashboardRoute,
  },
  {
    path: '/settings',
    component: SettingsRoute,
  },
];

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <Switch>
            <NoAuthRoute path="/login" exact>
              <LoginRoute />
            </NoAuthRoute>

            <AuthRoute path={appRoutes.map(({ path }) => path)}>
              <HStack height="100%" width="100%">
                <NavigationMenu />
                {appRoutes.map(({ path, component: Component }) => (
                  <Route path={path} key={Component.name}>
                    <Component />
                  </Route>
                ))}
              </HStack>
            </AuthRoute>

            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>

            <Route>
              <NotFoundRoute />
            </Route>
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
